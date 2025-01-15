"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = merge;
var someData = {
    title: "Typescript Bootcamp",
    subtitle: "Learn the language, build practical projects",
    lessonsCount: 100
};
var moreData = {
    seqNo: 10,
    price: 100
};
// we want to add moreData properties and someData properties onto a third object
// we can do it manually (not cool)
// const expectedOutput = {
//     title: "Typescript Bootcamp",
//     subtitle: "Learn the language, build practical projects",
//     lessonsCount: 100,
//     seqNo: 10,
//     price: 100
// }
// we can use merge method that "merge" 2 objects onto a third one
function merge(obj1, obj2) {
    return Object.assign(obj1, obj2);
}
var merged = merge(someData, moreData);
console.log(merged);
var merged2 = merge(someData, "Hello");
console.log(merged2);
