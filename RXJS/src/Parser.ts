import { Instruction, Operation } from "./Operations";
import { registryField } from "./Registry";



export function parseInput(input: string): Instruction[] {
    const instructions: Instruction[] = [];
    try{
        const lines = input.split("\n");
        for(let i = 0; i < lines.length; i++){
            const line = lines[i].trim().toUpperCase();
            if(line.length === 0) continue;
            const parts = line.split(" ");
            if(parts.length !== 4) throw new Error(`Invalid line ${i + 1}: ${line}`);
            const operation = Object.values(Operation).find((value) => value === parts[0].trim()) as Operation;
            if (operation == undefined || operation == null) throw new Error(`Invalid operation`);
            const dest = registryField.has(parts[1].trim()) ? parts[1].trim() : null;
            if (dest === null)
                throw new Error(`Invalid destination`);
            const op1 = Number(parts[2].trim()) ? Number(parts[2].trim()) : (registryField.has(parts[2].trim()) ? parts[2].trim() : null);
            if (op1 === null)
                throw new Error(`Invalid operand 1`);
            const op2 = Number(parts[3].trim()) ? Number(parts[3].trim()) : (registryField.has(parts[3].trim()) ? parts[3].trim() : null);
            if (op2 === null)
                throw new Error(`Invalid operand 2`);
            instructions.push(new Instruction(operation, op1, op2, dest));
        }
    }
    catch (exception) {
        return [];
    }
    
    return instructions;
}