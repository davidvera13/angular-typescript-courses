interface Course {
    title:string;
    lessonsCount:number;
}

const course1:Course = {
    title: "Typescript Bootcamp",
    lessonsCount: 100
};

const course2: Course = {
    title: "Angular For Beginners",
    lessonsCount: 20
};

function printCoursesVO(message:string, courses: Course[]) {
    console.log(message);
    for (let course of courses) {
        console.log(course.title);
    }
}

function printCourses(message:string, ...courses: Course[]) {
    console.log(message);
    for (let course of courses) {
        console.log(course.title);
    }
}

printCoursesVO("Welcome to the Angular course", [course1, course2]);
console.log("*************************");
// better alternative and eaiser to read
printCourses("Welcome to the Angular course", course1, course2);