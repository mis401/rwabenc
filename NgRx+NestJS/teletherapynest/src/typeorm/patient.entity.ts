import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { Session } from "./session.entity";
import { Role } from "src/auth/roles";
import { Message } from "./message.entity";
import { Review } from "./review.entity";
import { User } from "./user.entity";

// @Entity()
// export class Patient extends User{
//     @Column({unique: true})
//     zdravstvenaKnjizica: string;

//     @Column({unique: true})
//     lbo: string;

//     @ManyToMany(() => Session, session => session.participants)
//     participant: Session[];

//     @Column()
//     role: Role;

//     @OneToMany(() => Review, review => review.patient)
//     reviews: Review[];
    
        
// }
