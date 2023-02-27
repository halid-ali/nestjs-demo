import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { BcryptPassword } from 'src/utils/bcrypt.password';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.getUserByName(username);
        if (user && (await this.isPasswordMatch(user.password, password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.name, sub: user.id };
        return { access_token: this.jwtService.sign(payload, { expiresIn: '2d' }) };
    }

    private async isPasswordMatch(userPassword: string, givenPassword): Promise<boolean> {
        return await BcryptPassword.checkPassword(userPassword, givenPassword);
    }
}
