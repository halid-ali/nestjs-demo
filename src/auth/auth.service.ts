import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { BcryptPassword } from 'src/utils/bcrypt.password';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.getUserByName(username);
        if (user && this.isPasswordMatch(user.password, password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    private isPasswordMatch(userPassword: string, givenPassword): boolean {
        return BcryptPassword.checkPassword(userPassword, givenPassword);
    }
}
