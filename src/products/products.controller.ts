/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, BadRequestException, Res, UploadedFiles } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGaurd } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/user/entities/role.enum';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGaurd, RolesGuard)
  @Post()
  @UseInterceptors(FilesInterceptor('files', null
  , {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const name = file.originalname.split('.')[0];
        const fileExtension = file.originalname.split('.')[1];
        const newFileName = name.split(" ").join("_")+"_"+Date.now()+'.'+fileExtension;
        cb(null,newFileName);
      }
    }),
    fileFilter: (req,file, cb) => {
      if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(null, false);
      }
      cb(null, true);
    }
  }))
  create(@Body() createProductDto: CreateProductDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    if(!files){
      throw new BadRequestException('file is not an image')
    }
    return this.productsService.create(createProductDto, files);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGaurd, RolesGuard)  
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files', null
  , {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const name = file.originalname.split('.')[0];
        const fileExtension = file.originalname.split('.')[1];
        const newFileName = name.split(" ").join("_")+"_"+Date.now()+'.'+fileExtension;
        cb(null,newFileName);
      }
    }),
    fileFilter: (req,file, cb) => {
      if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(null, false);
      }
      cb(null, true);
    }
  }))
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    if(!files){
      throw new BadRequestException('file is not an image')
    }
    return this.productsService.update(+id, updateProductDto, files);
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGaurd, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
