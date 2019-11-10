import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { LeaveMaster } from "./LeaveMaster";
import { LeaveTransaction } from "./LeaveTransaction";

@Entity()
export class Employee {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ unique: true })
    public emailId: string;

    @Column()
    public password: string;

    @Column()
    public grade: string;

    @Column()
    public joinedOn: Date;

    @OneToOne((type) => LeaveMaster, (lea) => lea.employee, { eager: true })
    public leaveMaster: LeaveMaster;

    @OneToMany((type) => LeaveTransaction, (txn) => txn.employee, { eager: true })
    public txns: LeaveTransaction[];

}
