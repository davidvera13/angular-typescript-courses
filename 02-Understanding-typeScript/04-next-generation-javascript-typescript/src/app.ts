// 1. LET, CONST VS VAR
// we can define constants and variables
const username = "John Steed";
let age = 12;
age += age;
console.log(age);

// 'var' is used instead of 'let' or 'const'
// be aware of scope
var result;
let result2;
function add(a: number, b: number): number {
    result = a + b;
    result2 = a + b;
    return result;
}
console.log(add(1,2));
// here var and let work the same
console.log(result);
console.log(result2);


if (age < 18) {
    console.log("You can't vote ...");
    // global scope ...
    //var hasRightToVote = false;
    // block scope
    // TS6133: canDrive is declared but its value is never read.
    //let canDrive = false;
}

// TS2454: Variable hasRightToVote is used before being assigned.
// console.log(hasRightToVote);
// TS2304: Cannot find name canDrive
// console.log(canDrive);

// 2. Arrow Functions

let sum = (a: number, b: number) => a + b;
console.log("sum: " + sum(2,5));

// const printOutput =
//    (input: string | number) => console.log(input);

const printOutput: (input: string | number) => void =
        input => console.log(input);

printOutput("printOutput: " +  sum(2,5));


const button = document.querySelector("button");
if(button) {
    button.addEventListener("click", (evt: MouseEvent) => { console.log(evt) });
}

// default functions parameters
const doSum = (a: number, b: number = 13) => a + b;
console.log("doSum with default parameter: " + doSum(5));


// 3. spread operator ...
const hobbies = ["Sports", "Cooking", "Development", "reading", "painting", "travels"];
console.log("hobbies[0]: " + hobbies[0]);

const activeHobbies = ["Gaming"];
// will copy each elements of hobbies array in activeHobbies
activeHobbies.push(...hobbies);

const person = {
    firstName: "John",
    lastName: "Steed",
    age: 33
}

const personCopy = { ...person, hobbies: hobbies };
console.log("person: ",  person);
console.log("personCopy: ", personCopy)

// 4. Rest parameter
const calc = (...values: number[]) => {
    //let result = 0;
    //for(let value of values) {
    //    result += value;
    //}
    //return result;
    // here 0 is the first value: and allow to set previous value before iteration
    return values.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
}

console.log("calc is called ! " + calc(1, 2, 3, 4, 5));

// 5. arrays and object destructuring
const hobby1 = hobbies[0];
const hobby2 = hobbies[1];

const[first, second, ...others] = hobbies
console.log("first hobby: ", first);
console.log("second hobby: ", second);
console.log("others hobbies: ", others);

const { firstName, lastName } = person
console.log("firstName: ", firstName);
console.log("lastName: ", lastName);

const { firstName: userName, age: userAge } = person
console.log("userName: ", userName);
console.log("userAge: ", userAge);


