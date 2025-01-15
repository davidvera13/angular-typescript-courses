// model for course
interface Course {
    title:string;
    subtitle:string;
    stats: {
        lessonsCount:number;
    }
}

// object course
let course: Course = {
    title: "Typescript Bootcamp",
    subtitle: "Learn the language fundamentals, build practical projects",
    stats: {
        lessonsCount: 10
    }
};

// object course
let otherCourse: Course = {
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
const newCourse = {...course};
console.log("Shallow copy");
console.log(course);
console.log(newCourse);
console.log("**************************");

course.stats.lessonsCount = 100;
console.log("Shallow copy > update");
console.log(course);
console.log(newCourse);
console.log("**************************");