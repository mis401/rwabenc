
import { Role } from "src/auth/roles";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Session } from "./session.entity";
import { Message } from "./message.entity";
import { Review } from "./review.entity";
import { User } from "./user.entity";

@Entity()
export class Doctor extends User {

    @Column({
    })
    licenceId: string;

    @OneToMany(() => Session, session => session.doctor)
    sessions: Session[];

    @OneToMany(() => Review, review => review.doctor)
    reviews: Review[];

    @Column()
    role: Role;
}