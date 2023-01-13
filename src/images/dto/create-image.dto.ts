/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateImageDto {
    @ApiProperty({
        type: String
    })
    @IsNotEmpty()
    @IsString()
    filename: string;

    @IsNotEmpty()
    ownerId: number;
}
