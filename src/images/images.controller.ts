/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  // @Post()
  // create(@Body() createImageDto: CreateImageDto) {
  //   return this.imagesService.create(createImageDto);
  // }

  @Get('/get/:filename')
  async getImage(@Param('filename') filename, @Res() res:Response){
    res.sendFile(filename, {
      root: './uploads'
    });
  }
  
  @Patch()
  update(files: any, oldImages, product) {
    return this.imagesService.update(files, oldImages, product);
  }

  @Delete()
  remove(files) {
    return this.imagesService.remove(files);
  }
}
