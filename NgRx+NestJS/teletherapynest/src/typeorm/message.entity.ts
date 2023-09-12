import { Role } from "src/auth/roles";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Doctor } from "./doctor.entity";
import { Conversation } from "./conversation.entity";

@Entity()
export class Message {

    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column({
        nullable: false,
    })
    text: string;


    @ManyToOne(() => User, user => user.messages)
    userSender: User;


    @Column({
        type: 'timestamp',
    })
    date: Date;

    @ManyToOne(() => Conversation, conversation => conversation.messages)
    conversation: Conversation;
}