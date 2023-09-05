import { Role } from "src/Roles";

export class User {
  constructor(
    public email: string,
    public username: string,
    public firstName: string,
    public lastName: string,
    public phoneNumber: string,
    public id?: string,
    public zk?: string,
    public lbo?: string,
    public role?: Role,
  ) {}
}