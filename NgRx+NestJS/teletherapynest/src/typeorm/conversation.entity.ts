import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message.entity";
import { Session } from "./session.entity";


@Entity()
export class Conversation {

    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;


    @OneToMany(() => Message, message => message.conversation)
    messages: Message[];

}