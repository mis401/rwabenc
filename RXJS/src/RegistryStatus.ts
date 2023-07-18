import { Observable, filter, from, sample, take } from "rxjs";
import { FunctionalUnit, functionalUnitsState$ } from "./FunctionalUnit";
import { Instruction } from "./Operations";
import { FunctionalUnitStatus, Status } from "./Status";
import { cdb$, clockGenerator$, functionalUnits$, instructionBus$, instructionQueue$ } from ".";
import { registryField } from "./Registry";

export class RegistryStatus {
    public registers: Map<string, string> = new Map<string, string>();
    private subsWrite;
    private subsIssue;
    private table;
    public constructor() {
        registryField.forEach(register => {
            this.registers.set(register.name, null);
        });
        this.subsIssue = this.instructionIssueUpdate();
        this.subsWrite = this.instructionWriteUpdate();
        this.table = this.draw();
    }

    public get(register: string): string{
        return this.registers.get(register);
    }

    private instructionIssueUpdate = () => {
        return instructionBus$.subscribe(instruction => {
            this.registers.set(instruction.dest, instruction.fu.name);
            console.log(`Register ${instruction.dest} is now awaiting writeback from ${instruction.fu.name}`);
            let i;
            for (i = 0; i < registryField.size-1; i++){
                if(this.table.rows[0].cells[i].innerHTML === instruction.dest){
                    break;
                }
            }
            this.table.rows[1].cells[i].innerHTML = instruction.fu.name;
        });
    }   

    private instructionWriteUpdate = () => {
        return cdb$.subscribe(result => {
            let kvps = this.registers.entries();
            let i;
            for (i = 0; i < registryField.size - 1; i++) {
                if (this.table.rows[1].cells[i].innerHTML === result.source) {
                    this.table.rows[1].cells[i].innerHTML = "";
                    this.registers.set(this.table.rows[0].cells[i].innerHTML, null);
                    break;
                }
            }
        });
    }
    


    public draw() {
        const host = document.body;
        const table = document.createElement("table");
        table.id = "registryStatus";
        host.appendChild(table);
        const reg = table.insertRow();
        const fu = table.insertRow();
        for (let h of  this.registers.entries()) {
            table.rows[0].insertCell().innerHTML = h[0];
            table.rows[1].insertCell().innerHTML = h[1];
        }
    
        return table;
    }
}
