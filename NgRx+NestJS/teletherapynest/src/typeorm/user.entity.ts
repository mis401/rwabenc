import { Role } from "src/auth/roles";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

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
ime: string;

@Column()
prezime: string;

@Column()
phoneNumber: string;

@Column({unique: true})
zdravstvenaKnjizica: string;

@Column({unique: true})
lbo: string;

@Column()
role: Role;

}