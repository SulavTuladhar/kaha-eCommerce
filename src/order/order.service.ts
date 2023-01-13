/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { OrderDetailsService } from 'src/order_details/order_details.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private userService: UserService,
    private orderDetailService: OrderDetailsService
    ){}
  
  async create(createOrderDto: any, request: Request) {
    try{
      const user = await this.userService.findUser(request);
      const order = this.orderRepository.create({
        user: user
      })
      const savedOrder = await this.orderRepository.save(order);
      this.orderDetailService.create(savedOrder, createOrderDto);
      return 'Successfully ordered';
    }catch(err){
      throw err;
    }
  }

  async findAll(request: Request) {
    const user = await this.userService.findUser(request);
    const allOrders = await this.orderRepository
    .createQueryBuilder("order")
    .where("order.user.id= :userId", { userId: user.id })
    .leftJoinAndSelect('order.orderDetails', 'orderDetails')
    .getMany()
    // return this.orderRepository.find({
    //   relations: ['orderDetails']
    // })
    return allOrders;
  }

  async findOne(id: number, request: Request) {
    const user = await this.userService.findUser(request);
    console.log(user.id);
    const userId = user.id;
    
    const order = await this.orderRepository
    .createQueryBuilder("order")
    .where("order.user.id= :userId", { userId: userId })
    .andWhere("order.id = :id", {id: id} )
    .leftJoinAndSelect('order.orderDetails', 'orderDetails')
    .getOne()
    if(!order){
      return `No order found in OrderId of ${id} `
    }
    return order;
  }
}
