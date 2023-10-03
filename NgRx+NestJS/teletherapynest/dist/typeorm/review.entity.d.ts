import { User } from "./user.entity";
export declare class Review {
    id: number;
    text: string;
    date: Date;
    patient: User;
    doctor: User;
}
