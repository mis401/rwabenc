import { Role } from "src/auth/roles";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

@PrimaryGeneratedColumn({
    type: 'bigint',
})
id: number;

@Column()
username: string;

@Column()
passwordHash: string;

@Column()
email: string;


@Column()
zdravstvenaKnjizica: string;

@Column()
lbo: string;

@Column()
role: Role;

}