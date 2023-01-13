/* eslint-disable prettier/prettier */
import { BussinessInfo } from "src/bussiness-info/entities/bussiness-info.entity";
import { Order } from "src/order/entities/order.entity";
import { Role } from "src/user/entities/role.enum";
import { Entity ,Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER
    })
    role: Role;

    @OneToOne(()=> BussinessInfo, bussinessInfo => bussinessInfo.user, { cascade: true } )
    // @JoinColumn()
    bussinessInfo: BussinessInfo 

    @OneToMany(() => Order, order => order.user, { cascade: true })
    orders: Order[]
}
