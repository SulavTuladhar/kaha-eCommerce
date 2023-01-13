/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Request, Response } from 'express';

@Injectable()
export class CartService {
  constructor(private productService: ProductsService){}

  async create(createCartDto: CreateCartDto, request: Request ,response: Response) {
    const product = await this.productService.findOne(createCartDto.productId);
    const cookie = request.cookies['cart'];  
    if(cookie){
      const cartItem = {
        productId: createCartDto.productId,
        name: product.name,
        quantity: createCartDto.quantity,
        price: product.price,
      }
      cookie.push(cartItem);
      return cookie;
    }else{
      let cart = [];
      const cartItem = {
        productId: createCartDto.productId,
        name: product.name,
        quantity: createCartDto.quantity,
        price: product.price,
      }
      cart.push(cartItem)
      response.cookie('cart', cart);
      return cart;
    }
    
    
  }

  findAll(request: Request) {
    const cookie = request.cookies['cart'];  

    return cookie;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
