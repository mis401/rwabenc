export class User {
  constructor(
    public email: string,
    public username: string,
    public id?: string,
    public zk?: string,
    public lbo?: string,
  ) {}
}