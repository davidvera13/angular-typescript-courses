// number
var lessonsCount = 10;
var lessonsPrice = 12.45;
var total = lessonsCount + 12;
console.log("total : " + total);
// string
var title = "Typescript course";
var subtitle = "Learn basics and advanced typescript features";
var fullTitle = title + " >> " + subtitle;
console.log("fullTitle : " + fullTitle);
// boolean
var isPublished = true;
if (isPublished) {
    console.log("course is published... " + isPublished);
}
// more on strings: template strings
var mainTitle = "full title with string template: ".concat(title, " >> ").concat(subtitle);
console.log("fullTitle : " + mainTitle);
// type inference
var currentTitle = 'this is a string and inferred as a string...';
var count = 14;
var concatenation = "".concat(currentTitle, " has been downloaded ").concat(count, " times");
console.log(concatenation);
// type annotation is not mandatory and is required in function declaration
function printCourse(courseTitle, courseSubtitle, lessonsCount) {
    var currentFullTitle = courseTitle + courseSubtitle + lessonsCount;
    console.log(currentFullTitle);
}
function printCourse2(courseTitle, courseSubtitle, lessonsCount) {
    var currentFullTitle = courseTitle + courseSubtitle + lessonsCount;
    console.log(currentFullTitle);
}
console.log("***********************");
// here values are inferred .. very bad practice
printCourse("fist course", "sutitle", "ten courses");
printCourse(5, 5, 10);
// would create compilation error
//printCourse2("fist course", "sutitle", "ten courses");
printCourse2("fist course", "sutitle", 10);
// // typescript static type system vs javascript dynamic type
// let dummyVar = "dummyString";
// console.log("before: " + typeof dummyVar);
// // type is static TS2322: Type number is not assignable to type string
// // in runtime in js type can be changed
// dummyVar = 10;
// console.log("after: " + typeof dummyVar);
// console.log(dummyVar)
// object primitive type
var course = {
    title: "TypeScript course",
    subtitle: "Learn basics and advanced typescript features",
    count: 20
};
console.log("***********************");
console.log("type of course is " + typeof course);
console.log(course.title);
console.log(course.subtitle);
console.log(course.count);
// TS2339: Property price does not exist on type
// console.log(course.price);
// nested object type
var courseWithDetails = {
    title: "TypeScript course",
    subtitle: "Learn basics and advanced typescript features",
    count: 20,
    author: {
        firstName: "John",
        lastName: "Wick",
        age: 42,
        email: "john.wick@mail.com"
    }
};
console.log("***********************");
console.log("type of courseWithDetails is " + typeof courseWithDetails);
console.log(courseWithDetails.title);
console.log(courseWithDetails.subtitle);
console.log(courseWithDetails.count);
console.log(courseWithDetails.author);
console.log(courseWithDetails.author.firstName);
console.log(courseWithDetails.author.lastName);
console.log(courseWithDetails.author.age);
console.log(courseWithDetails.author.email);
