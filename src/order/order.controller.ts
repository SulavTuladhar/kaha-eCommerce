/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/user/entities/role.enum';
import { JwtAuthGaurd } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Req } from '@nestjs/common/decorators';
import { Request } from 'express';
import { ParseArrayPipe } from '@nestjs/common/pipes';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('order')
@Controller('order')
@Roles(Role.USER)
@UseGuards(JwtAuthGaurd, RolesGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body(new ParseArrayPipe({items: CreateOrderDto})) createOrderDto: CreateOrderDto[], @Req() request: Request) {
    return this.orderService.create(createOrderDto, request);
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.orderService.findAll(request);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: Request) {
    return this.orderService.findOne(+id, request);
  }
}
