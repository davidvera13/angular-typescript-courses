// debugging in browser .... need to run live server
// 1. Compile: tsc 07-debugging.ts
// 2. add web server (package.json) : npm init
// 3. run: npm install lite-server
// 4. run: npm start
// Using also sourceMap (typeScript)
// 1. compile: tsc --sourceMap 07-debugging.ts
// 2. run npm start

// in node backend
// 1. compile: tsc --sourceMap 07-debugging.ts
// 2. debug:
//      node --inspect 07-debugging.js
//      node --inspect-brk 07-debugging.js


const courseName = "Typescript Bootcamp";

debugger;


if (courseName) {
    const subtitle = "Learn the language fundamentals, build practical projects";
    printCourseName(courseName);
}

function printCourseName(name :string) {
    debugger;
    console.log("The course name is " + name.toUpperCase());
}