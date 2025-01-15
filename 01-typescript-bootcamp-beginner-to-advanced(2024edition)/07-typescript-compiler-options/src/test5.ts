
interface Course5 {
    title:string;
    subtitle?: string;
    lessonsCount?:number;
}

let age5 = 35;

function saveCourse5(course: Course5, callback: Function) {
    this.course = course;
    setTimeout(() => {
        callback(this.course?.title ?? "unknown course");
    }, 1000);

}

const cb5 = (title:string) => console.log("Save successful.", title);

saveCourse5({title:"Typescript Bootcamp"}, cb5);