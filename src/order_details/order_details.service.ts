/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { UpdateOrderDetailDto } from './dto/update-order_detail.dto';
import { OrderDetail } from './entities/order_detail.entity';

@Injectable()
export class OrderDetailsService {
  constructor(
    @InjectRepository(OrderDetail) private orderDetailRepository: Repository<OrderDetail>,
    private productService: ProductsService
    ){}

  async create(savedOrder, data) {
    try{
      data.map(async (item) => {
          const product = await this.productService.findOne(item.productId);
          // if(product.stock > 0){
            const orderDetail = this.orderDetailRepository.create({
              productId: item.productId,
              quantity: item.quantity,
              name: product.name,
              price: product.price,
              total: item.quantity * product.price,
              order: savedOrder
            })
            const updateProduct = {
              name: product.name,
              category: product.category,
              stock: product.stock - item.quantity,
              price: product.price
            }
            this.productService.update(item.productId, updateProduct)
            await this.orderDetailRepository.save(orderDetail);
          // }else{
          //   throw new Error('yolo')
          // }
        });
    }catch(err){
      throw err;
    }
    
  }

  findAll() {
    return `This action returns all orderDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderDetail`;
  }

  update(id: number, updateOrderDetailDto: UpdateOrderDetailDto) {
    updateOrderDetailDto
    return `This action updates a #${id} orderDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderDetail`;
  }
}
