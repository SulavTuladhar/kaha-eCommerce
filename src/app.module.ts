/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { ImagesModule } from './images/images.module';
import { OrderModule } from './order/order.module';
import { BussinessInfoModule } from './bussiness-info/bussiness-info.module';
import { CartModule } from './cart/cart.module';
import { OrderDetailsModule } from './order_details/order_details.module';
import config from '../ormConfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), UserModule, AuthModule, ProductsModule, ImagesModule, OrderModule, BussinessInfoModule, CartModule, OrderDetailsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
