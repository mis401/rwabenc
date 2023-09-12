
import { User } from "./user.entity";
import { Doctor } from "./doctor.entity";
import { Message } from "./message.entity";
import { Session } from "./session.entity";
import { Conversation } from "./conversation.entity";
import { Review } from "./review.entity";
import { Patient } from "./patient.entity";



const entities = [User, Doctor, Message, Session, Conversation, Review, Patient];

export {User, Doctor, Message, Session, Conversation, Review, Patient};
export default entities;