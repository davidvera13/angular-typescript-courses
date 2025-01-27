// unions
type inputs = number | string;
// we accept number OR string
let val1: inputs;
let val2: inputs;

val1 = "Say hello world";
val2 = 123500;
// TS2322: Type string[] is not assignable to type inputs
// val1 = ["ooops"];

function doSum(val1: inputs, val2: inputs): number {
    let result;
    if(typeof val1 === 'number' && typeof val2 === 'number') {
        result = val1 + val2;
    } else {
        result = val1.toString() + ' ' + val2.toString();
    }
    return result;
}

console.log("doSum result: ", doSum(12, 3));
console.log("doSum result: ", doSum('Walter', 'Skinner'));

// literal types
function combine(
    input1: number | string,
    input2: number | string,
    resultConversion: 'as-number' | 'as-text'
) {
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
        result = +input1 + +input2;
    } else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
console.log("Using literal types");
const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);

const combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges);

const combinedNames = combine('John', 'Steed', 'as-text');
console.log(combinedNames);

// type aliases
// we can set a list of authorized values. type is not a string but specific values
type grantedRoles = "sysop" | "admin" | "user" | "guest"
type numStringAlias = 'as-number' | 'as-text';

function combineAlias(
    input1: number | string,
    input2: number | string,
    resultConversion: numStringAlias
) {
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
        result = +input1 + +input2;
    } else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
console.log("Using type alias");
const combinedAges2 = combineAlias(30, 26, 'as-number');
console.log(combinedAges2);

const combinedStringAges2 = combineAlias('30', '26', 'as-number');
console.log(combinedStringAges2);

const combinedNames2 = combineAlias('John', 'Steed', 'as-text');
console.log(combinedNames2);