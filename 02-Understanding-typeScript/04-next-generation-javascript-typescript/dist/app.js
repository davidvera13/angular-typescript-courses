"use strict";
const username = "John Steed";
let age = 12;
age += age;
console.log(age);
var result;
let result2;
function add(a, b) {
    result = a + b;
    result2 = a + b;
    return result;
}
console.log(add(1, 2));
console.log(result);
console.log(result2);
if (age < 18) {
    console.log("You can't vote ...");
}
let sum = (a, b) => a + b;
console.log("sum: " + sum(2, 5));
const printOutput = input => console.log(input);
printOutput("printOutput: " + sum(2, 5));
const button = document.querySelector("button");
if (button) {
    button.addEventListener("click", (evt) => { console.log(evt); });
}
const doSum = (a, b = 13) => a + b;
console.log("doSum with default parameter: " + doSum(5));
const hobbies = ["Sports", "Cooking", "Development", "reading", "painting", "travels"];
console.log("hobbies[0]: " + hobbies[0]);
const activeHobbies = ["Gaming"];
activeHobbies.push(...hobbies);
const person = {
    firstName: "John",
    lastName: "Steed",
    age: 33
};
const personCopy = Object.assign(Object.assign({}, person), { hobbies: hobbies });
console.log("person: ", person);
console.log("personCopy: ", personCopy);
const calc = (...values) => {
    return values.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
};
console.log("calc is called ! " + calc(1, 2, 3, 4, 5));
const hobby1 = hobbies[0];
const hobby2 = hobbies[1];
const [first, second, ...others] = hobbies;
console.log("first hobby: ", first);
console.log("second hobby: ", second);
console.log("others hobbies: ", others);
const { firstName, lastName } = person;
console.log("firstName: ", firstName);
console.log("lastName: ", lastName);
const { firstName: userName, age: userAge } = person;
console.log("userName: ", userName);
console.log("userAge: ", userAge);
//# sourceMappingURL=app.js.map