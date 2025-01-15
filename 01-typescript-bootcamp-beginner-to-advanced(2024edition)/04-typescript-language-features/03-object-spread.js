var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
// object course
var course = {
    title: "Typescript Bootcamp",
    subtitle: "Learn the language fundamentals, build practical projects",
    stats: {
        lessonsCount: 10
    }
};
// object course
var otherCourse = {
    title: course.title,
    subtitle: course.subtitle,
    stats: {
        lessonsCount: course.stats.lessonsCount
    }
};
console.log("Deep copy");
console.log(course);
console.log(otherCourse);
console.log("**************************");
console.log("Deep copy > update");
otherCourse.stats.lessonsCount = 12345;
console.log(course);
console.log(otherCourse);
console.log("**************************");
// create a shallow copy of an object
var newCourse = __assign({}, course);
console.log("Shallow copy");
console.log(course);
console.log(newCourse);
console.log("**************************");
course.stats.lessonsCount = 100;
console.log("Shallow copy > update");
console.log(course);
console.log(newCourse);
console.log("**************************");
