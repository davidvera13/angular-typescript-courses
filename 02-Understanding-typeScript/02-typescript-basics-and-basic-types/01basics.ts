// important note:
// javascript uses dynamic type resolved at runtime
// typescript uses static types set during development

//function add(number1, number2) {
//    return number1 + number2;
//}

// such error could happen using javascript without 'types'
//const number1 = '5';
//const number2 = 3.14;
//const result = add(number1, number2);
// will return 53.14 : concatenation
//console.log(result);


function add(
    number1: number,
    number2: number): number {
    console.log(typeof number1);
    console.log(typeof number2);
    return number1 + number2;
}

const number1 = 5;
const number2 = 3.14;
// if we keep string instead of number :
// > TS2345: Argument of type string is not assignable to parameter of type number
const result = add(number1, number2);
// will return 53.14 : concatenation
console.log(result);

//////////////////////////////////////////////////////////////
// core types                                               //
//////////////////////////////////////////////////////////////

// numbers
let numericValue = 234;
// string
let stringValue = "John Wick";
// boolean
const printResult = true;

// value is automatically inferred
let inferredValue = 5

// TS7043: Variable someData implicitly has an any type,
// but a better type may be inferred from usage.
let someData;
someData = "John Wick";
// we should define type if we just declare property without value
let someOtherData: string;
let otherData: string = "Yes";
someOtherData = "Hello World";


sum(number1, numericValue, printResult);
sum(number1, number2, false);

function sum(
    number1: number,
    number2: number,
    printResult: boolean): number {
    let sum = number1 + number2;
    if(printResult) {
        console.log("print result: ", sum);
    } else {
        console.log("nothing to print");
    }
    return sum
}