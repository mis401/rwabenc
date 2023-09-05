import { body } from ".";
import { FunctionalUnit } from "./FunctionalUnit";
import { Registry, registryField } from "./Registry";

export enum Operation {
    Add = 'ADD',
    Subtract = 'SUB',
    Multiply = 'MUL',
    Divide = 'DIV',
}



export const doOperation = (operation: Operation,  dest: string, op1: string | number, op2?: string | number) : number => {
    if (typeof op1 === 'string') op1 = registryField.get(op1).value;
    if (typeof op2 === 'string') op2 = registryField.get(op2).value;
    switch(operation) {
        case Operation.Add:
            return registryField.get(dest).value = op1 + op2;
        case Operation.Subtract:
            return registryField.get(dest).value = op1 - op2;
        case Operation.Multiply:
            return registryField.get(dest).value = op1 * op2;
        case Operation.Divide:
            return registryField.get(dest).value = op1 / op2;
    }
}

export const OperationLatency = (op: Operation): number => {
    switch(op) {
        case Operation.Add:
            return 1;
        case Operation.Subtract:
            return 1;
        case Operation.Multiply:
            return 2;
        case Operation.Divide:
            return 5;
        default:
            return 0;
    }
}

export class Instruction {
    public index?: number;
    public fu?: FunctionalUnit;
    public operation: Operation;
    public op1: number | string;
    public op1Immediate?: boolean;
    public op2Immediate?: boolean;
    public op2?: number | string;
    public dest?: string;
    public source?: string;
    public constructor(operation: Operation, op1: number | string, op2?: number | string, dest?: string) {
        this.operation = operation;
        this.op1 = op1;
        if (Number(op1))
            this.op1Immediate = true;
        else
            this.op1Immediate = false;
        this.op2 = op2;
        if (Number(op2)) 
            this.op2Immediate = true;
        else
            this.op2Immediate = false;
        this.dest = dest;

        //console.log(this.toString());
    }

    public toString() {
        return `${this.operation} ${this.dest} ${this.op1} ${this.op2}`;
    }

    
}


