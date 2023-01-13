/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateBussinessInfoDto {
    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    @IsString()
    panId: number;

    @ApiProperty({
        type: Boolean
    })
    @IsNotEmpty()
    @IsString()
    pickUp: boolean;

    @ApiProperty({
        type: Boolean
    })
    @IsNotEmpty()
    DeliveryService: boolean

    @ApiProperty({
        type: Number
    })
    @IsNotEmpty()
    phone: number

    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    Address: string

    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    email: string

}

