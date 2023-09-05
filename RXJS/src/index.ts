import { Observable, Subject, combineLatest, filter, from, interval, map, of, skipUntil, switchMap, take, takeLast, takeUntil, takeWhile, tap, zip } from "rxjs";
import { Instruction, Operation } from "./Operations";
import { Registry } from "./Registry";
import { FunctionalUnit, functionalUnitsState$ } from "./FunctionalUnit";
import { Result } from "./Result";
import { InstructionQueue } from "./InstructionQueue";
import { RegistryStatus } from "./RegistryStatus";
import { InstructionTable } from "./InstructionTable";
import { Status } from "./Status";
import { parseInput } from "./Parser";

export const controlSignal$ = new Subject<boolean>();
export const tactGenerator$ = interval(1000);
export const clockGenerator$ = combineLatest([controlSignal$, tactGenerator$]).pipe(
    filter(([controlSignal, tact]) => controlSignal),
    map(([controlSignal, tact]) => tact),
    );



export const body = document.body;
export const instructionQueue = new InstructionQueue();
export const cdb$: Subject<Result> = new Subject<Result>();
export const instructionBus$: Subject<Instruction> = new Subject<Instruction>();
export const instructionQueue$ = from(instructionQueue.getAllInstructions());

// let instructionsTest : Instruction[] = parseInput(
//     `add r1 r2 r3
//     add r4 r5 r6
//     add r7 13 r7`
//     );
// if (instructionsTest.length == 0){
//     console.log("Greska u parsiranju");
// }
// instructionsTest.forEach(instruction => console.log(instruction.toString()));

export const instructionTable = new InstructionTable();
instructionTable.draw();

zip(controlSignal$, instructionQueue$).pipe(
    filter(([controlSignal, instruction]) => controlSignal == true),
    map(([controlSignal, instruction]) => instruction),
).subscribe(instruction => {
    console.log(`Instruction ${instruction.toString()} is now drawing in table`);
    const table = instructionTable.table;
    let tr = table.insertRow();
    tr.insertCell(0).innerHTML = instruction.toString();
    tr.insertCell(1).innerHTML = "";
    tr.insertCell(2).innerHTML = "";
    tr.insertCell(3).innerHTML = "";
})


export const fuArray = new Array<FunctionalUnit>();

for (let i = 0; i < 3; i++) {
    fuArray.push(new FunctionalUnit(`Add${i}`, Operation.Add, ));
}
for (let i = 0; i < 2; i++) {
    fuArray.push(new FunctionalUnit(`Mul${i}`, Operation.Multiply));
}
export const functionalUnits$ = of(fuArray);

functionalUnitsState$.pipe(
    tap(fu => console.log(fu))
).subscribe(state => {
    const table = instructionTable.table;
    let tr = table.rows[state.instruction.index+1];
    if (!tr){
        tr = table.insertRow(state.instruction.index+1);
        table.rows[state.instruction.index+1].insertCell(0).innerHTML = state.instruction.toString();
    }
    switch (state.status) {
        case Status.Issued:
            table.rows[state.instruction.index+1].insertCell(1).innerHTML = `${state.cycle}`;
            break;
        case Status.ExecStart:
            table.rows[state.instruction.index+1].insertCell(2).innerHTML = `${state.cycle}`;
            break;
        case Status.ExecComplet:
            table.rows[state.instruction.index+1].cells[2].innerHTML = `${tr.cells[2].innerHTML} - ${state.cycle}`;
            break;
        case Status.Write:
            table.rows[state.instruction.index+1].insertCell(3).innerHTML = `${state.cycle}`;
            break;

    }
});

export const registryStatus = new RegistryStatus();

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






