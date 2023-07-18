import { Observable, filter, from, sample, take } from "rxjs";
import { FunctionalUnit, functionalUnitsState$ } from "./FunctionalUnit";
import { Instruction } from "./Operations";
import { FunctionalUnitStatus, Status } from "./Status";
import { cdb$, clockGenerator$, functionalUnits$, instructionBus$, instructionQueue$ } from ".";
import { registryField } from "./Registry";

export class RegistryStatus {
    public registers: Map<string, string> = new Map<string, string>();
    public constructor() {
        registryField.forEach(register => {
            this.registers.set(register.name, null);
        });
        this.instructionIssueUpdate();
        this.instructionWriteUpdate();
    }

    public get(register: string): string{
        return this.registers.get(register);
    }

    private instructionIssueUpdate = () => {
        instructionBus$.subscribe(instruction => {
            this.registers.set(instruction.dest, instruction.fu.name);
            console.log(`Register ${instruction.dest} is now awaiting writeback from ${instruction.fu.name}`);
        });
    }   

    private instructionWriteUpdate = () => {
        cdb$.subscribe(result => {
            let kvps = this.registers.entries();
            for (let kvp of kvps){
                if (kvp[1] === result.source){
                    this.registers.set(kvp[0], null);
                    console.log(`Register ${kvp[0]} is now free`);
                }
            }
        });
    }
}
