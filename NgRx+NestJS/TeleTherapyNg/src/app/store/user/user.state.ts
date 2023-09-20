import { User } from "../..//models";

export interface UserState {
    user: User | null;
    userId: number | null;
    error: any;
    token: string | null;
}

export const initialUserState: UserState = {
    user: null,
    userId: null,
    error: null,
    token: null,
}