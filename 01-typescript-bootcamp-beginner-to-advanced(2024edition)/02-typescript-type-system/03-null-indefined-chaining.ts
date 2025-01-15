// value is optional here
let title: string;
let subTitle: string = null;
console.log("title: " + title);
console.log("subTitle: " + subTitle);

if(!title) {
    console.log("Value is actually undefined...")
}

if(!subTitle) {
    console.log("Value is actually null...")
}

// optional chaining
//let course = {
//    title: "Typescript course"
//}
//let course = null;
let course;

// if course is null : TypeError: Cannot read properties of null (reading 'title')
// if course is undefined: TypeError: Cannot read properties of undefined (reading 'title')
// too verbose
if(course && course.title) {
    console.log(`the title is ${course.title}`);
}

// optional chaining : course && course.title equivalent to course?.title
// also called elvis operator
console.log("course?.title: " + course?.title);
if(course?.title) {
    console.log(`the title is ${course.title}`);
}

// null Coalescing operator
let courseTitle = course?.title ?? "we have no value yet...";
console.log("courseTitle: " + courseTitle)

let otherCourse = {
    textFields: {
        title: "Typescript course"
    }
}


// when to use optional chaining ?
function logCourseTitle(course) {
    if(!course?.textFields) {
        console.error("Ooops");
        return;
    }
    if(course.textFields.title) {
        console.log(`the title is ${course.textFields.title}`);
    }
}

logCourseTitle(otherCourse);