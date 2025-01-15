
interface Course1 {
    title:string;
    subtitle?: string;
    lessonsCount?:number;
}

let age1 = 35;

function saveCourse1(course: Course1, callback: Function) {
    this.course = course;
    setTimeout(() => {
        callback(this.course?.title ?? "unknown course");
    }, 1000);

}

const cb1 = (title:string) => console.log("Save successful.", title);

saveCourse1({title:"Typescript Bootcamp"}, cb1);