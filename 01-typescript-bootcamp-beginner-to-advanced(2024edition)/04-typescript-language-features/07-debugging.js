// debugging in browser .... need to run live server
// 1. Compile: tsc 07-debugging.ts
// 2. add web server (package.json) : npm init
// 3. run: npm install lite-server
// 4. run: npm start
var courseName = "Typescript Bootcamp";
debugger;
if (courseName) {
    var subtitle = "Learn the language fundamentals, build practical projects";
    printCourseName(courseName);
}
function printCourseName(name) {
    debugger;
    console.log("The course name is " + name.toUpperCase());
}
//# sourceMappingURL=07-debugging.js.map