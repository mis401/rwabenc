import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
// import { Doctor } from "./doctor.entity";
// import { Patient } from "./patient.entity";

@Entity()
export class Review {

    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column({
        length: 200,    
    })
    text: string;

    @Column()
    date: Date;

    @ManyToOne(() => User, patient => patient.reviewsLeft)
    patient: User;

    @ManyToOne(() => User, doctor => doctor.reviewed)
    doctor: User;
}