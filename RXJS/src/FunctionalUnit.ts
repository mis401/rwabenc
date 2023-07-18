import { Observable, Subject, Subscriber, Subscription, combineLatest, distinct, filter, sample, take, takeLast, tap, zip } from "rxjs";
import { Instruction, Operation, OperationLatency, doOperation } from "./Operations";
import { Registry, registryField } from "./Registry";
import { Result } from "./Result";
import { FunctionalUnitStatus, Status } from "./Status";
import { cdb$, clockGenerator$, instructionBus$, registryStatus } from ".";

export class FunctionalUnit {
    public name: string;
    public operation: Operation;
    public latency: number;
    private instruction: Instruction;
    public busy : boolean;
    private cycle: number;
    public startCycle: number;
    public endCycle: number;
    private status: Status;
    private result: number;
    private instructionBus$;
    private clockSub: Subscription;
    public constructor(name: string, op: Operation){ 
        this.operation = op;
        this.name = name;
        this.busy = false;
        this.latency = OperationLatency(this.operation);
        this.status = Status.NotIssued;
        this.clockSub = clockGenerator$.subscribe(cycle => this.workCycle(this.instruction, cycle));
        this.instructionBus$ = instructionBus$.pipe(
            filter(instruction => instruction.fu.name === this.name),
            distinct(),
            sample(clockGenerator$),
        ).subscribe((instruction) => {this.instruction = instruction});
        
    }
     

    private workCycle(instruction: Instruction, cycle: number) {
        if(instruction == null || instruction == undefined)
            return;
        if (!this.busy) {
            console.log(`Usao u cycle ${this.name}`)
            this.issue(instruction, cycle);
            console.log(`Izasao iz cycle ${this.name}`);
        }
        else { 
            console.log(this.instruction.op1Immediate);
            if (this.instruction.op1Immediate == false) {
                console.log(`Op1 nije immediate`)
                let op1SourceFU = registryStatus.get(this.instruction.op1 as string);
                if (op1SourceFU != null) {
                    cdb$.pipe(
                        filter(result => result.source === op1SourceFU),
                    ).subscribe({
                        next: result => {
                            this.instruction.op1 = result.value;
                            this.instruction.op1Immediate = true;
                        }
                    })
                }
                else{
                    this.instruction.op1Immediate = true;
                    this.instruction.op1 = registryField.get(this.instruction.op1 as string).value;
                }
            }
            if (this.instruction.op2Immediate == false) {
                console.log(`Op2 nije immediate`);
                let op2SourceFU = registryStatus.get(this.instruction.op2 as string);
                if (op2SourceFU != null) {
                    cdb$.pipe(
                        filter(result => result.source === op2SourceFU),
                    ).subscribe({
                        next: result => {
                            this.instruction.op2 = result.value;
                            this.instruction.op2Immediate = true;
                        }
                    })
                }
                else{
                    this.instruction.op2Immediate = true;
                    this.instruction.op2 = registryField.get(this.instruction.op2 as string).value;
                }
            }
            if (this.status === Status.Issued && this.instruction.op1Immediate && this.instruction.op2Immediate) {
                console.log(`execution starts`);
                functionalUnitsState$.next({
                    fu: this,
                    cycle: cycle,
                    status: Status.ExecStart,
                    instruction: this.instruction,
                });
                this.status = Status.ExecStart;
                this.endCycle = cycle + this.latency;
            }
            else if (this.status === Status.ExecStart && cycle === this.endCycle) {
                console.log(`execution ends`)
                this.status = Status.ExecComplet;
                this.result = doOperation(this.operation, this.instruction.dest, this.instruction.op1, this.instruction.op2);
                functionalUnitsState$.next({
                    fu: this,
                    cycle: cycle,
                    status: Status.ExecComplet,
                    instruction: this.instruction,
                });
            }
            else if (this.status === Status.ExecComplet) {
                console.log(`writes`);
                functionalUnitsState$.next({
                    fu: this,
                    cycle: cycle,
                    status: Status.Write,
                    instruction: this.instruction,
                });
                cdb$.next({
                    source: this.name,
                    value: this.result,
                });
                this.status = Status.Write;
                console.log(`reset`);
                this.instruction = null;
                this.busy = false;
                this.status = Status.NotIssued;
            }
            
            
        }
    
    }
    
    private issue(instruction: Instruction, cycle: number){
        this.instruction = instruction;
        this.busy = true;
        this.startCycle = cycle;
        this.status = Status.Issued;
        this.endCycle = Number.MAX_VALUE;
        functionalUnitsState$.next({
            fu: this,
            cycle: cycle,
            status: Status.Issued,
            instruction: instruction,
        });
        console.log(`Instruction ${instruction.toString()} issued to ${this.name}`);
    }
}

export const functionalUnitsState$: Subject<FunctionalUnitStatus> = new Subject<FunctionalUnitStatus>();