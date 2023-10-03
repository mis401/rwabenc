
import { User } from "./user.entity";

import { Message } from "./message.entity";
import { Session } from "./session.entity";
import { Conversation } from "./conversation.entity";
import { Review } from "./review.entity";




const entities = [User, Message, Session, Conversation, Review,];

export {User, Message, Session, Conversation, Review, };
export default entities;