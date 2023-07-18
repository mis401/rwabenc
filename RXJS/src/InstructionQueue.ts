import { Observable, Subscription, filter, find, from, map, tap } from "rxjs";
import { Instruction, Operation } from "./Operations";
import { registryField } from "./Registry";
import { clockGenerator$, controlSignal$, fuArray, functionalUnits$, instructionBus$ } from ".";
import { FunctionalUnit } from "./FunctionalUnit";

export class InstructionQueue {
    
    private instructions: Instruction[] = [];
    public constructor() {
        this.draw();
        clockGenerator$.subscribe(() => this.schedule());
    }
    private schedule(){
        console.log(`Work started`);
        if(this.instructions.length > 0){
            let freeFU: FunctionalUnit = null;
            for (let f of fuArray){
                if(f.busy === false && f.operation === this.instructions[0].operation){
                    freeFU = f;
                    freeFU.busy = true; 
                    break;
                }
            }
            console.log(`search result fu: ${freeFU}`);
            if (freeFU != null){
                console.log(`Brt wtf ${this.instructions[0]}`)
                let ins = this.instructions.shift();
                ins.fu = freeFU;
                console.log(ins);
                instructionBus$.next(ins);
                
            }
            else{
                console.log(`No free FU for ${this.instructions[0].operation}`);
            }
        }
    }
    private instructions$ : Observable<Instruction>;


    public addInstruction(instruction: Instruction) {
        this.instructions.push(instruction);
    }

    public getInstruction(): Instruction {
        return this.instructions.shift() || null;
    }

    public getAllInstructions(): Instruction[] {
        return this.instructions;
    }

    public isEmpty(): boolean {
        return this.instructions.length === 0;
    }

    public draw() {
        const host = document.body;
    
        const instructionWrapper = document.createElement('div');
        instructionWrapper.id = 'instructionWrapper';
        instructionWrapper.classList.add('instruction-wrapper');
        host.appendChild(instructionWrapper);
    
        const instructionOp1 = document.createElement('input');
        instructionOp1.type = 'text';
        instructionOp1.id = 'instructionOp1';
        instructionOp1.placeholder = 'Enter Operand 1';
        instructionWrapper.appendChild(instructionOp1);
        
        const instructionOp = document.createElement('select');
        instructionOp.id = 'instructionOp';
        instructionOp.options.add( new Option('Add', Operation.Add));
        instructionOp.options.add( new Option('Multiply', Operation.Multiply));
        instructionOp.options.add( new Option('Subtract', Operation.Subtract));
        instructionOp.options.add( new Option('Divide', Operation.Divide));
        instructionWrapper.appendChild(instructionOp);
        
        
        const instructionOp2 = document.createElement('input');
        instructionOp2.type = 'text';
        instructionOp2.id = 'instructionOp2';
        instructionOp2.placeholder = 'Enter Operand 2';
        instructionWrapper.appendChild(instructionOp2);
        
        const instructionDest = document.createElement('input');
        instructionDest.type = 'text';
        instructionDest.id = 'instructionDest';
        instructionDest.placeholder = 'Enter Destination';
        instructionWrapper.appendChild(instructionDest);
    
    
        const instructionButton = document.createElement('button');
        instructionButton.id = 'instructionButton';
        instructionButton.innerText = 'Add Instruction';
        instructionButton.onclick = () => this.createInstruction();
        instructionWrapper.appendChild(instructionButton);
        
        const startButton = document.createElement('button');
        startButton.id = 'startButton';
        startButton.innerText = 'Start';
        startButton.onclick = () => controlSignal$.next(true);
        instructionWrapper.appendChild(startButton);

        
        const stopButton = document.createElement('button');
        stopButton.id = 'stopButton';
        stopButton.innerText = 'Stop';
        stopButton.onclick = () => controlSignal$.next(false);
        instructionWrapper.appendChild(stopButton);

        const instructionList = document.createElement('list');
        instructionList.id = 'instructionList';
        instructionList.classList.add('instruction-list');
        host.appendChild(instructionList);

        this.instructions$ = from(this.instructions).pipe(
            tap(x => console.log(` Tap radi? ${x.toString()}`)),
            filter(x => {if(this.instructions[this.instructions.length-1] == x) return true}),
        );

    }

    private createInstruction() {
        const op1 = (document.getElementById('instructionOp1') as HTMLInputElement).value;
        const op2 = (document.getElementById('instructionOp2') as HTMLInputElement).value;
        const op = (document.getElementById('instructionOp') as HTMLSelectElement).value;
        const dest = (document.getElementById('instructionDest') as HTMLInputElement).value;
        if (typeof op1 === 'string' && op1.length === 0 || Number(op1.substring(1))>registryField.size-1 ) return;
        if (typeof op2 === 'string' && op2.length === 0 || Number(op2.substring(1))>registryField.size-1 )  return;
        if (typeof dest === 'string' && dest.length === 0 || Number(dest.substring(1))>registryField.size-1 ) return;

        let instruction = new Instruction(op as Operation, op1, op2, dest);
        this.addInstruction(instruction);
        console.log(instruction);
        instruction.index = this.instructions.length-1;
        this.instructions$.subscribe(instruction => {
            let li = document.createElement('li');
            li.innerText = instruction.toString();
            document.getElementById('instructionList').appendChild(li);
        });
    }
}