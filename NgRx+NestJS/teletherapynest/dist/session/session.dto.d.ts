export interface SessionDTO {
    name: string;
    description: string;
    doctorId: number;
    appointment: Date;
    participantsId: number[];
    conversationId: number;
}
