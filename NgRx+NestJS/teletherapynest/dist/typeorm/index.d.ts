import { User } from "./user.entity";
import { Message } from "./message.entity";
import { Session } from "./session.entity";
import { Conversation } from "./conversation.entity";
import { Review } from "./review.entity";
declare const entities: (typeof Message | typeof Conversation | typeof Session | typeof Review)[];
export { User, Message, Session, Conversation, Review, };
export default entities;
