var course1 = {
    title: "Typescript Bootcamp",
    lessonsCount: 100
};
var course2 = {
    title: "Angular For Beginners",
    lessonsCount: 20
};
function printCoursesVO(message, courses) {
    console.log(message);
    for (var _i = 0, courses_1 = courses; _i < courses_1.length; _i++) {
        var course = courses_1[_i];
        console.log(course.title);
    }
}
function printCourses(message) {
    var courses = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        courses[_i - 1] = arguments[_i];
    }
    console.log(message);
    for (var _a = 0, courses_2 = courses; _a < courses_2.length; _a++) {
        var course = courses_2[_a];
        console.log(course.title);
    }
}
printCoursesVO("Welcome to the Angular course", [course1, course2]);
console.log("*************************");
printCourses("Welcome to the Angular course", course1, course2);
