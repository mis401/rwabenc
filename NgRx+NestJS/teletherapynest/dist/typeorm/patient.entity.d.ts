import { Session } from "./session.entity";
import { Role } from "src/auth/roles";
import { Review } from "./review.entity";
import { User } from "./user.entity";
export declare class Patient extends User {
    zdravstvenaKnjizica: string;
    lbo: string;
    participant: Session[];
    role: Role;
    reviews: Review[];
}
