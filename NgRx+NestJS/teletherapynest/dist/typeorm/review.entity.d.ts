import { Doctor } from "./doctor.entity";
import { Patient } from "./patient.entity";
export declare class Review {
    id: number;
    text: string;
    date: Date;
    patient: Patient;
    doctor: Doctor;
}
