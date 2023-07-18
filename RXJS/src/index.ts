import { Observable, Subject, filter, from, interval, skipUntil, switchMap, take, takeLast, takeUntil, takeWhile, tap } from "rxjs";
import { Instruction, Operation } from "./Operations";
import { Registry } from "./Registry";
import { FunctionalUnit, functionalUnitsState$ } from "./FunctionalUnit";
import { Result } from "./Result";
import { InstructionQueue } from "./InstructionQueue";
import { RegistryStatus } from "./RegistryStatus";
import { InstructionTable } from "./InstructionTable";
import { Status } from "./Status";

export const controlSignal$ = new Subject<boolean>();
export const clockGenerator$ = interval(1000).pipe(skipUntil(controlSignal$));


export const body = document.body;
export const instructionQueue = new InstructionQueue();
export const cdb$: Subject<Result> = new Subject<Result>();
export const instructionBus$: Subject<Instruction> = new Subject<Instruction>();
export const instructionQueue$ = from(instructionQueue.getAllInstructions());
export const registryStatus = new RegistryStatus();
export const instructionTable = new InstructionTable();
instructionTable.draw();
controlSignal$.pipe(
    tap(() => console.log("Master on")),
    take(1),
    switchMap(() => instructionQueue$),
).subscribe(instruction => {
    console.log(`Instruction ${instruction.toString()} is now drawing in table`);
    const table = instructionTable.table;
    let tr = table.insertRow();
    tr.insertCell(0).innerHTML = instruction.toString();
    tr.insertCell(1).innerHTML = "";
    tr.insertCell(2).innerHTML = "";
    tr.insertCell(3).innerHTML = "";
})


const fuArray = new Array<FunctionalUnit>();

for (let i = 0; i < 3; i++) {
    fuArray.push(new FunctionalUnit(`Add${i}`, Operation.Add, ));
}
for (let i = 0; i < 2; i++) {
    fuArray.push(new FunctionalUnit(`Mul${i}`, Operation.Multiply));
}
export const functionalUnits$ = from(fuArray);

functionalUnitsState$.pipe(
    tap(fu => console.log(fu))
).subscribe(state => {
    const table = instructionTable.table;
    let tr = table.rows[state.instruction.index+1];
    switch (state.status) {
        case Status.Issued:
            tr.cells[1].innerHTML = `${state.cycle}`;
            break;
        case Status.ExecStart:
            tr.cells[2].innerHTML = `${state.cycle}`;
            break;
        case Status.ExecComplet:
            tr.cells[2].innerHTML = `${tr.cells[2].innerHTML} - ${state.cycle}`;
            break;
        case Status.Write:
            tr.cells[3].innerHTML = `${state.cycle}`;
            break;
    }
});

instructionBus$.pipe(
    tap(i => console.log(`tap iz index ${i.toString()}`)),
).subscribe();

cdb$.pipe(
    tap(),
).subscribe(result => console.log(` cdb tap iz index ${result.toString()}`));
// functionalUnitsState$.subscribe(fu => {
//     console.log(`${fu.fu.name} is now ${fu.status}`);
//     const table = instructionTable.table;
//     let tr = instructionTable.table.insertRow();
//     tr.classList.add(fu.instruction.toString());
//     tr.insertCell().innerHTML = fu.instruction.toString();
//     switch(fu.status){
//         case Status.Issued:
//             tr.insertCell().innerHTML = `${fu.cycle}`;
//         case Status.ExecStart:
//             tr.insertCell().innerHTML = `${fu.cycle}`;
//         case Status.ExecComplet:
//             tr.insertCell().innerHTML = `${fu.cycle}`;
//         case Status.Write:
//             tr.insertCell().innerHTML = `${fu.cycle}`;

// });






