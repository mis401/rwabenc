import { Observable } from "rxjs";
import { Instruction } from "./Operations";
import { FunctionalUnitStatus } from "./Status";
import { body } from ".";



export class InstructionTable {
    public instructions: Instruction[] = [];
    public table: HTMLTableElement;
    public constructor() {
    }

    public draw() {
        const host = body;   

        const table = document.createElement('table');
        table.id = 'instructionTable';
        table.classList.add('instruction-table');
        host.appendChild(table);

        const header = document.createElement('tr');
        header.id = 'instructionHeader';
        header.classList.add('instruction-header');
        table.appendChild(header);


        const headerOp = document.createElement('th');
        headerOp.id = 'instructionHeaderOp';
        headerOp.classList.add('instruction-header-op');
        headerOp.innerText = 'Operation';
        header.appendChild(headerOp);

        const headerIssue = document.createElement('th');
        headerIssue.id = 'instructionHeaderIssue';
        headerIssue.classList.add('instruction-header-issue');
        headerIssue.innerText = 'Issue';
        header.appendChild(headerIssue);

        const headerExecute = document.createElement('th');
        headerExecute.id = 'instructionExec';
        headerExecute.classList.add('instruction-header-exec');
        headerExecute.innerText = 'Execute';
        header.appendChild(headerExecute);

        const headerWrite = document.createElement('th');
        headerWrite.id = 'instructionHeaderWrite';
        headerWrite.classList.add('instruction-header-write');
        headerWrite.innerText = 'Write';
        header.appendChild(headerWrite);

        this.table = table;
    }


}

