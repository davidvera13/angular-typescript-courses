// Function Return Types & "void"
function doAdd(n1: number, n2: number): number {
    // returns a number
    return n1 + n2;
}

function printResult(n1: number, n2: number): void {
    console.log(doAdd(n1, n2));
}

function printSomething(n1: number): void {
    console.log(n1);
}

console.log("Return types & void");
printResult(5, 14);


// function as type
console.log("Function as type");
//let combineValues = doAdd;
let combineValues: Function;
combineValues = doAdd;
console.log(combineValues(3,15));
combineValues = printResult;
console.log(combineValues(3,15));

// 04functions.ts:12:17 - error TS2554: Expected 2 arguments, but got 1.
//console.log("Should crash...");
//combineValues = printSomething;
//console.log(combineValues(3,15));

// we define that combineValuesFn accept any function that satisfies taking 2 numbers as parameter and return a number
let combineValuesFn: (val1: number, val2: number) => number
combineValuesFn = doAdd;
console.log(combineValues(3,15));
// TS2322: Type (n1: number, n2: number) => void is not assignable to type (val1: number, val2: number) => number
//combineValuesFn = printResult;
//console.log(combineValues(3,15));

//Function Types & Callback
console.log("Function Types & Callback");
function addAndHandle(n1: number, n2: number, callback: (num: number) => void) {
    const res = n1 + n2;
    callback(res);
}

// call and pass an anonymous function: callback
addAndHandle(10, 20, (res: number) => console.log("result is " + res));
