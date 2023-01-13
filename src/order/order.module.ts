/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserModule } from 'src/user/user.module';
import { OrderDetailsModule } from 'src/order_details/order_details.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), UserModule, OrderDetailsModule],
  controllers: [OrderController],
  providers: [OrderService, JwtStrategy, RolesGuard],
})
export class OrderModule {}
