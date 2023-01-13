/* eslint-disable prettier/prettier */
import { Order } from "src/order/entities/order.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: number;

    @Column()
    quantity: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    total: number;

    @ManyToOne(() => Order, order => order.orderDetails, { onDelete: 'CASCADE'})
    order: Order
}
