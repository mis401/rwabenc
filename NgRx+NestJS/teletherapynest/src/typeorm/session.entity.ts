import { type } from "os";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Doctor } from "./doctor.entity";
import { Conversation } from "./conversation.entity";
import { Patient } from "./patient.entity";

@Entity()
export class Session {

    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({nullable: true})
    appointments: Date;
    
    @ManyToOne(() => Doctor, doctor => doctor.sessions)
    doctor: Doctor;

    @ManyToMany(() => Patient, patient => patient.participant)
    @JoinTable()
    participants: Patient[];

    @OneToOne(() => Conversation)
    @JoinTable()
    conversation: Conversation;

}