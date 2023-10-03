export interface MessageDTO {
    id?: number,
    userSender: number,
    date: Date,
    conversation: number,
    text: string
}