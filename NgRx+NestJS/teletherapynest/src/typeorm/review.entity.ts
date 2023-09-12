import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Doctor } from "./doctor.entity";
import { Patient } from "./patient.entity";

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

    @ManyToOne(() => Patient, patient => patient.reviews)
    patient: Patient;

    @ManyToOne(() => Doctor, doctor => doctor.reviews)
    doctor: Doctor;
}