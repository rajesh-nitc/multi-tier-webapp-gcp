import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Employee } from "./Employee";
export enum Category {
    CASUAL = "casual",
    EARNED = "earned",
    SICK = "sick",
}

@Entity()
export class LeaveTransaction {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public txnOn: Date;

    @Column()
    public from: Date;

    @Column()
    public to: Date;

    @Column({
        type: "enum",
        enum: Category,
    })
    public category: Category;

    @ManyToOne((type) => Employee, (emp) => emp.txns)
    public employee: Employee;

}
