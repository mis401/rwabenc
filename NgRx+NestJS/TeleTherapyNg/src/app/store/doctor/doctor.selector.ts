import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Features } from "src/Features";
import { DoctorState } from "./doctor.state";

// export const docFeatureSelector = createFeatureSelector<DoctorState>(Features.Doctor);
// export const selectDoctor = createSelector(docFeatureSelector, (doctorState) => doctorState.doctor);
// export const selectToken = createSelector(docFeatureSelector, (doctorState) => doctorState.token);