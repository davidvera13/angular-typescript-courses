// todo: npm install -g typescript
// tsc  02-compiling.ts
// we generate js file
const courseName = 'Learning typescript';

function printCourseName(name: string) {
    // we assume name is a string ...
    console.log('The course name is ' + courseName.toUpperCase());
}

printCourseName(courseName);
