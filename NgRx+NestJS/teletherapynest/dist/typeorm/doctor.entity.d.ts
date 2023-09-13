import { Session } from "./session.entity";
import { Review } from "./review.entity";
import { User } from "./user.entity";
export declare class Doctor extends User {
    licenceId: string;
    sessions: Session[];
    reviews: Review[];
}
