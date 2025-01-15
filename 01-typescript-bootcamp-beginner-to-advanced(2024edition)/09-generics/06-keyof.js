"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractProperty = extractProperty;
var course = {
    title: "Typescript Bootcamp",
    subtitle: "Learn the language, build practical projects",
    lessonsCount: 100
};
// let's do use keyof in a method:
// we accept an object and a property name, and returns an object value
function extractProperty(data, property) {
    return data[property];
}
var val = extractProperty(course, "lessonsCount");
console.log(val);
// TS2345: Argument of type "lessonsCount2" is not assignable to parameter of type keyof Course
// const val2 = extractProperty(course, "lessonsCount2");
