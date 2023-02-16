import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbSettings } from './constants/dbsettings.constants';
import { Product } from './products/product.entity';
import { ProductModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: DbSettings.Type,
            host: DbSettings.Host,
            port: DbSettings.Port,
            username: DbSettings.Username,
            password: DbSettings.Password,
            database: DbSettings.DatabaseName,
            entities: [Product, User],
            //should be false in production mode, otherwise all production data will be lost
            synchronize: true,
        }),
        ProductModule,
        AuthModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
