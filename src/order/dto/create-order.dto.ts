/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    productId: number;

    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    quantity: number
}
