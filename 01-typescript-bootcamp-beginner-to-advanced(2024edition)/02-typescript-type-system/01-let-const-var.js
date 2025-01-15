// tsc 01-let-const-var.ts
// > node 01-let-const-var.js
//const name = 'Learning typescript';
// ReferenceError: name is not defined
// const: constant, value can't be changed and is read only
var courseName = 'Learning typescript';
// Attempt to assign to const or readonly variable
// courseName = "some other course";
// let is not immutable
var course = 'Learning java script ?';
function printCourseName(name) {
    console.log('The course name is ' + name.toUpperCase());
}
printCourseName(courseName);
printCourseName(course);
course = 'Nope, typescript...';
printCourseName(course);
