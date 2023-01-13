/* eslint-disable prettier/prettier */
import { Product } from "src/products/entities/product.entity";
import { Entity ,Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    filename: string;

    @ManyToOne(() => Product, product => product.images, { onDelete: 'CASCADE'})
    product: Product
}
