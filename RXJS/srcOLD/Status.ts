import { FunctionalUnit } from "./FunctionalUnit";
import { Instruction } from "./Operations";

export enum Status {
    NotIssued = 'Not issued',
    Issued = 'Issued',
    ExecStart = 'Execution started',
    ExecComplet = 'Execution completed',
    Write = 'Write',
}

export interface FunctionalUnitStatus {
    fu: FunctionalUnit;
    status: Status;
    instruction?: Instruction;
    cycle: number;
}