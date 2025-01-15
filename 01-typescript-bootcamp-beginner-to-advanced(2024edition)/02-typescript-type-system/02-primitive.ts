// number
const lessonsCount: number = 10;
const lessonsPrice: number = 12.45;

const total = lessonsCount + 12;
console.log("total : " + total);

// string
let title: string = "Typescript course";
let subtitle: string = "Learn basics and advanced typescript features"
const fullTitle: string = title + " >> " + subtitle;

console.log("fullTitle : " + fullTitle);

// boolean
let isPublished: boolean = true;
if(isPublished) {
    console.log("course is published... " + isPublished);
}

// more on strings: template strings
let mainTitle: string = `full title with string template: ${title} >> ${subtitle}`;
console.log("fullTitle : " + mainTitle);

// type inference
let currentTitle = 'this is a string and inferred as a string...';
let count = 14;
let concatenation = `${currentTitle} has been downloaded ${count} times`;
console.log(concatenation);

// type annotation is not mandatory and is required in function declaration
function printCourse(courseTitle, courseSubtitle, lessonsCount) {
    const currentFullTitle = courseTitle + courseSubtitle + lessonsCount;
    console.log(currentFullTitle);
}

function printCourse2(courseTitle: string, courseSubtitle: string, lessonsCount: number) {
    const currentFullTitle = courseTitle + courseSubtitle + lessonsCount;
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
let course: {title: string, subtitle: string, count: number} = {
  title: "TypeScript course",
  subtitle: "Learn basics and advanced typescript features",
  count: 20
}
console.log("***********************");
console.log("type of course is " + typeof course)
console.log(course.title);
console.log(course.subtitle);
console.log(course.count);
// TS2339: Property price does not exist on type
// console.log(course.price);

// nested object type
let courseWithDetails = {
    title: "TypeScript course",
    subtitle: "Learn basics and advanced typescript features",
    count: 20,
    author: {
        firstName: "John",
        lastName: "Wick",
        age: 42,
        email: "john.wick@mail.com"

    }
}

console.log("***********************")
console.log("type of courseWithDetails is " + typeof courseWithDetails)
console.log(courseWithDetails.title);
console.log(courseWithDetails.subtitle);
console.log(courseWithDetails.count);
console.log(courseWithDetails.author);
console.log(courseWithDetails.author.firstName);
console.log(courseWithDetails.author.lastName);
console.log(courseWithDetails.author.age);
console.log(courseWithDetails.author.email);