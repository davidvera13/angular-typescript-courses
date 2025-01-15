// λ tsc 01-arrow-functions.ts
// λ node 01-arrow-functions.js
var currentCourse = {
    title: "Typescript Bootcamp",
    subTitle: "Nice course",
    lessons: 35
};
function saveCourse(course, callback) {
    var savedCourse = course;
    setTimeout(function () {
        var _a;
        callback((_a = savedCourse === null || savedCourse === void 0 ? void 0 : savedCourse.title) !== null && _a !== void 0 ? _a : "unknown course");
    }, 1000);
}
var cb = function (title) { return console.log("Save successful.", title); };
saveCourse(currentCourse, cb);
