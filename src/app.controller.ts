import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/auth-strategy/local-auth.guard';
import { JwtAuthGuard } from './auth/auth-strategy/jwt-auth.guard';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private authService: AuthService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() request) {
        return this.authService.login(request.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() request) {
        return request.user;
    }
}
