import { Conversation} from "src/typeorm";

export interface SessionDTO {
    name: string;
    description: string;
    appointment: Date;
    doctorId: number;
    participantsId?: number[];
    conversationId?: number;
}