import { type } from "os";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
// import { Doctor } from "./doctor.entity";
import { Conversation } from "./conversation.entity";
// import { Patient } from "./patient.entity";

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

    @Column({nullable: true, type: 'timestamp'})
    appointment: Date;

    @ManyToOne(() => User, doctor => doctor.sessionsLed)
    doctor: User
    
    @ManyToMany(() => User, patient => patient.participant)
    @JoinTable()
    participants: User[];

    @OneToOne(() => Conversation, {
        cascade: true,
    })
    @JoinColumn()
    conversation: Conversation;

}