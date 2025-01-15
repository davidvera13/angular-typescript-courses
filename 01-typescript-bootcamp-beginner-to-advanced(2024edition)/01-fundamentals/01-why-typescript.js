// todo: run js using node
// > node 01-why-typescript.js
const name = 'Learning typescript';
// ReferenceError: name is not defined
// const courseName = 'Learning typescript';

function printCourseName(name) {
    // we assume name is a string ...
    console.log('The course name is ' + name.toUpperCase());
}

// this should work, we pass a string ...
printCourseName(name);
// this is wrong, we'll see error on runtime
// TypeError: name.toUpperCase is not a function
printCourseName(100);
printCourseName([0, 1, 2]);
printCourseName({firstName: 'John', lastName: 'Wick'});