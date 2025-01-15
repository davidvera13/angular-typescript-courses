// 1. Compile: tsc 03-run-on-browser.ts
// 2. add web server (package.json) : npm init
// 3. run: npm install lite-server
// 4. run npm start
const courseName = 'Learning typescript';

function printCourseName(name: string) {
    // we assume name is a string ...
    console.log('The course name is ' + courseName.toUpperCase());
}

printCourseName(courseName);
