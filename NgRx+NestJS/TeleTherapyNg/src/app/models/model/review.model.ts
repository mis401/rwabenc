import { Doctor } from "./doctor.model";
import { User } from "./user.model";

export interface Review
{
    id: number;
    text: string;
    date: Date;
    patient: User;
    doctor: User;
}