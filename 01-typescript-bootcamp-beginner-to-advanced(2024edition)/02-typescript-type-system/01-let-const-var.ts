// tsc 01-let-const-var.ts
// > node 01-let-const-var.js
//const name = 'Learning typescript';
// ReferenceError: name is not defined
// const: constant, value can't be changed and is read only
const courseName = 'Learning typescript';
// Attempt to assign to const or readonly variable
// courseName = "some other course";

// let is not immutable and is scoped
let course = 'Learning java script ?';
if(course) {
    // visible inside
    printCourseName(course);
    const subtitle = "Learn fundamentals & know how to build applications";
    // var is not scoped, can be used out of the current scope
    // var value = "dummy value";
    printCourseName(subtitle);
}
// TS2304: Cannot find name subtitle
// printCourseName(subtitle)
//printCourseName(value)

function printCourseName(name: string) {
    console.log('The course name is ' + name.toUpperCase());
}

printCourseName(courseName);
printCourseName(course);
course = 'Nope, typescript...';
printCourseName(course);