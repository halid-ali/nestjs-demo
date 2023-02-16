import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptPassword } from 'src/utils/bcrypt.password';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private dataSource: DataSource,
    ) {}

    async getUsers() {
        const users = await this.userRepository.find();
        return users.map((user) => ({
            id: user.id,
            name: user.name,
            password: user.password,
        }));
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw new NotFoundException();
        return {
            id: user.id,
            name: user.name,
            password: user.password,
        };
    }

    async getUserByName(name: string) {
        const user = await this.userRepository.findOneBy({ name });
        if (!user) throw new NotFoundException();
        return {
            id: user.id,
            name: user.name,
            password: user.password,
        };
    }

    async addUser(name: string, password: string): Promise<any> {
        return await this.executeTransaction(async (queryRunner: QueryRunner) => {
            const newUser = this.userRepository.create({
                name: name,
                password: await this.encryptPassword(password),
            });
            await queryRunner.manager.save(newUser);
            return 'User created with id: ' + newUser.id.toString();
        }, 'User cannot be created!');
    }

    async updateUser(id: number, name: string, password: string) {
        return await this.executeTransaction(async () => {
            const userToUpdate = await this.userRepository.findOneBy({ id });
            if (!userToUpdate) return 'User cannot be found';

            if (name) userToUpdate.name = name;
            if (password) userToUpdate.password = await this.encryptPassword(password);

            const result = await this.userRepository.update({ id }, userToUpdate);
            return result.affected ? 'User updated.' : 'User update failed.';
        }, 'User cannot be updated!');
    }

    async deleteUser(id: number) {
        return await this.executeTransaction(async () => {
            const result = await this.userRepository.delete({ id });
            return result.affected ? 'User is deleted.' : 'User delete failed.';
        }, 'User cannot be deleted!');
    }

    private async executeTransaction(func: (arg0: QueryRunner) => Promise<string>, failureResult: string) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const result = await func(queryRunner);
            await queryRunner.commitTransaction();
            return result;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return failureResult;
        } finally {
            await queryRunner.release();
        }
    }

    private encryptPassword(password: string) {
        return BcryptPassword.encryptPassword(password);
    }
}
