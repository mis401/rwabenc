import { Conversation, User } from "src/typeorm";

export interface MessageDTO {
    id: number,
    text: string,
    userSender: number,
    date: Date,
    conversation: number
}