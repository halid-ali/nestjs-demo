import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbSettings } from './constants/dbsettings.constants';
import { Product } from './products/product.entity';
import { ProductModule } from './products/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: DbSettings.Type,
      host: DbSettings.Host,
      port: DbSettings.Port,
      username: DbSettings.Username,
      password: DbSettings.Password,
      database: DbSettings.DatabaseName,
      entities: [Product],
      //should be false in production mode, otherwise all production data will be lost
      synchronize: true,
    }),
    ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
