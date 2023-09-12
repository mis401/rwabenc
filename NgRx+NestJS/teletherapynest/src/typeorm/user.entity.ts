import { Role } from "src/auth/roles";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, TableInheritance, Unique } from "typeorm";
import { Session } from "./session.entity";
import { Message } from "./message.entity";
import { Review } from "./review.entity";

@Entity()

export class User {

    @PrimaryGeneratedColumn({
        type: 'bigint',
    })
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    passwordHash: string;

    @Column({unique: true})
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phoneNumber: string;

    
    @OneToMany(() => Message, message => message.userSender)
    messages: Message[];


}