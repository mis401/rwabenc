import { User } from "../models";

export interface UserState {
    user: User | null;
    error: any;
    token: string | null;
}

export const initialUserState: UserState = {
    user: null,
    error: null,
    token: null,
}