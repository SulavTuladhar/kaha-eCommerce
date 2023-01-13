/* eslint-disable prettier/prettier */
import { Image } from "src/images/entities/images.entity";
import { Entity ,Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    category: string;

    @Column()
    stock: number;

    @Column()
    price: number;

    @OneToMany(() => Image, image => image.product, { cascade: true })
    images: Image[]
}
