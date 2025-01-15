var _a;
// value is optional here
var title;
var subTitle = null;
console.log("title: " + title);
console.log("subTitle: " + subTitle);
if (!title) {
    console.log("Value is actually undefined...");
}
if (!subTitle) {
    console.log("Value is actually null...");
}
// optional chaining
//let course = {
//    title: "Typescript course"
//}
//let course = null;
var course;
// if course is null : TypeError: Cannot read properties of null (reading 'title')
// if course is undefined: TypeError: Cannot read properties of undefined (reading 'title')
// too verbose
if (course && course.title) {
    console.log("the title is ".concat(course.title));
}
// optional chaining : course && course.title equivalent to course?.title
// also called elvis operator
console.log("course?.title: " + (course === null || course === void 0 ? void 0 : course.title));
if (course === null || course === void 0 ? void 0 : course.title) {
    console.log("the title is ".concat(course.title));
}
// null Coalescing operator
var courseTitle = (_a = course === null || course === void 0 ? void 0 : course.title) !== null && _a !== void 0 ? _a : "we have no value yet...";
console.log("courseTitle: " + courseTitle);
var otherCourse = {
    textFields: {
        title: "Typescript course"
    }
};
// when to use optional chaining ?
function logCourseTitle(course) {
    if (!(course === null || course === void 0 ? void 0 : course.textFields)) {
        console.error("Ooops");
        return;
    }
    if (course.textFields.title) {
        console.log("the title is ".concat(course.textFields.title));
    }
}
logCourseTitle(otherCourse);
