import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ObjectID, ObjectIdColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity()
export class Task extends BaseEntity {

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;
}