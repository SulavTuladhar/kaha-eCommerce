/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    category: string;

    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    stock: number

    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    price: number

}
