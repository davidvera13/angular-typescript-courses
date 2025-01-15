// todo: npm install -g typescript
// > tsc  02-compiling.ts
// we generate js file
// to prevent errors on compile
// > tsc --noEmitOnError 01-why-typescript.js

var courseName = 'Learning typescript';
function printCourseName(name) {
    // we assume name is a string ...
    console.log('The course name is ' + courseName.toUpperCase());
}
printCourseName(courseName);
