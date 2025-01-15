// λ tsc 01-arrow-functions.ts
// λ node 01-arrow-functions.js
let currentCourse: Course = {
    title:"Typescript Bootcamp",
    subTitle: "Nice course",
    lessons: 35
}

interface Course {
    title: string;
    subTitle: string;
    lessons: number;
}
function saveCourse(course: Course, callback: Function) {
    this.savedCourse = course;

    setTimeout(() => {
        callback(this.savedCourse?.title ?? "unknown course");
    }, 1000);

}

const cb = (title:string) => console.log("Save successful.", title);
saveCourse(currentCourse, cb);