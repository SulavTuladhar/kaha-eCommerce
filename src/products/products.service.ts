/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ImagesService } from 'src/images/images.service';
import { NotFoundError } from 'rxjs';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private imageService: ImagesService
  ){}

  async create(createProductDto: CreateProductDto, files: Array<Express.Multer.File>) {
    try{
      const product = this.productRepository.create({
        name: createProductDto.name,
        category: createProductDto.category,
        stock: createProductDto.stock,
        price: createProductDto.price
      })
      const savedProduct = await this.productRepository.save(product);
      
      this.imageService.create(files,savedProduct);
      return {
        savedProduct,
      }
    }catch(err){
      throw err;
    }
  }

  findAll() {
    return this.productRepository.find({
      relations: ['images']
    });
  }

  async findOne(id: number) {
    try{
      const product = await this.productRepository.findOne(id, {
        relations: ['images']
      });
      if(!product){
        throw new NotFoundException();
      }
      return product;
    }catch(err){
      throw err;
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto, files: any = 0) {
    try{
      let product = await this.findOne(id);
      product.name = updateProductDto.name;
      product.category = updateProductDto.category;
      product.stock = updateProductDto.stock;
      product.price = updateProductDto.price;
      let updatedProduct = await this.productRepository.save(product);
      if(files){
        this.imageService.update(files, updatedProduct.images, updatedProduct)
      }
      return updatedProduct;
    }catch(err){
      throw err;
    }
  }

  async remove(id: number) {
    try{
      let product = await this.findOne(id);
      this.productRepository.remove(product);
      this.imageService.remove(product.images);
      return `product removed successfully`;
    }catch(err){
      throw err;
    }
  }
}
