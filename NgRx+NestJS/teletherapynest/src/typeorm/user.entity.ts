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

    @Column()
    role: Role;

    //patient

    @Column({unique: true, nullable: true})
    zdravstvenaKnjizica: string;

    @Column({unique: true, nullable: true})
    lbo: string;

    @ManyToMany(() => Session, session => session.participants)
    participant: Session[];

    @OneToMany(() => Session, session => session.doctor, {nullable: true})
    sessionsLed: Session[];

    @OneToMany(() => Review, review => review.patient)
    reviewsLeft: Review[];
    
    //doctor
    @Column({nullable: true
    })
    licenceId: string;

    @OneToMany(() => Review, review => review.doctor)
    reviewed: Review[];
        

}