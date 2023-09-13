import { Doctor } from "./doctor.entity";
import { Conversation } from "./conversation.entity";
import { Patient } from "./patient.entity";
export declare class Session {
    id: number;
    name: string;
    description: string;
    appointment: Date;
    doctor: Doctor;
    participants: Patient[];
    conversation: Conversation;
}
