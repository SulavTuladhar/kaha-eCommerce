/* eslint-disable prettier/prettier */
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BussinessInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    panId: number;

    @Column()
    pickUp: boolean;

    @Column()
    DeliveryService: boolean;

    @Column()
    email: string;

    @Column()
    phone: number;

    @Column()
    Address: string;

    @OneToOne(()=> User, user=> user.bussinessInfo, { onDelete: 'CASCADE'})
    @JoinColumn()
    user: User;
}
