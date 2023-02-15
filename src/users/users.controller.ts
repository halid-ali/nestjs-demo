import { Body, Controller, Delete, Get, Header, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @Header('content-type', 'application/json')
    async getUsers() {
        return await this.usersService.getUsers();
    }

    @Get(':id')
    async getProduct(@Param('id') id: number) {
        return await this.usersService.getUser(id);
    }

    @Post()
    async addUser(@Body('name') name: string, @Body('password') password: string) {
        const result = await this.usersService.addUser(name, password);
        return { result: result };
    }

    @Patch(':id')
    async updateUser(@Param('id') id: number, @Body('name') name: string, @Body('password') password: string) {
        return await this.usersService.updateUser(id, name, password);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        return await this.usersService.deleteUser(id);
    }
}
