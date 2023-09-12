import { Doctor } from "src/app/models";

export interface DoctorState {
    doctor: Doctor | null;
    token: string | null;
    error: any | null;
}

export const initialDoctorState: DoctorState = {
    doctor: null,
    token: null,
    error: null,
}