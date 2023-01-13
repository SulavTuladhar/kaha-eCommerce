/* eslint-disable prettier/prettier */
import { OrderDetail } from "src/order_details/entities/order_detail.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.orders, { onDelete: 'CASCADE'})
    user: User

    @OneToMany(() => OrderDetail, deatil => deatil.order, { cascade: true })
    orderDetails: OrderDetail[]
}
