/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/images.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import path from 'path';

@Injectable()
export class ImagesService {
  constructor(@InjectRepository(Image) private imageRepository: Repository<Image>){}

  create(files: any, savedProduct: object) {
    files.forEach((image : any) => 
      this.imageRepository.save({
        filename: image.filename,
        product: savedProduct
      }))
    
  }
  
  async update(files: any, oldImages, product) {
    try{
       oldImages.forEach(async (img) => {
        const image = await this.imageRepository.findOneOrFail(img.id);
        this.imageRepository.remove(image)
      fs.unlinkSync('./uploads/' + image.filename)
      })
      this.create(files, product)
    }catch(err){
      throw err;
    }
  }

  remove(files) {
    
    files.forEach(async (img) => {
      const image = await this.imageRepository.findOneOrFail(img.id);
      fs.unlinkSync(process.cwd() + '/uploads/' + image.filename)
    })
  }
}
