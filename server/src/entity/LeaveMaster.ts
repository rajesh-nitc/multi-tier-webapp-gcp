import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";

@Entity()
export class LeaveMaster {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public earned: number;

    @Column()
    public casual: number;

    @Column()
    public sick: number;

    @OneToOne((type) => Employee, (emp) => emp.leaveMaster)
    @JoinColumn()
    public employee: Employee;

}
