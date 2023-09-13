import { Session } from "../model/session.model";

export type SessionBasic = Pick<Session, 'id' | 'name' | 'description' | 'appointment' | 'doctor'>