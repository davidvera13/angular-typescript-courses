// todo: run js using node
// > node 01-why-typescript.js
//const name = 'Learning typescript';
// ReferenceError: name is not defined
const courseName = 'Learning typescript';

// TS7044: Parameter name implicitly has an any type, but a better type may be inferred from usage.
// let's say name is a string ...
function printCourseName(name: string) {
    // we assume name is a string ...
    console.log('The course name is ' + name.toUpperCase());
}

// this should work, we pass a string ...
printCourseName(courseName);
// type is invalid, so we have error before run time: compilation errors
// TS2345: Argument of type number is not assignable to parameter of type string
// printCourseName(100);
// TS2345: Argument of type number[] is not assignable to parameter of type string
// printCourseName([0, 1, 2]);
// TS2345: Argument of type { firstName: string; lastName: string; } is not assignable to parameter of type string
// printCourseName({firstName: 'John', lastName: 'Wick'});