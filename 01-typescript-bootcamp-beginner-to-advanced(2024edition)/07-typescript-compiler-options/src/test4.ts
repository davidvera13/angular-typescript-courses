
interface Course4 {
    title:string;
    subtitle?: string;
    lessonsCount?:number;
}

let age4 = 35;

function saveCourse4(course: Course4, callback: Function) {
    this.course = course;
    setTimeout(() => {
        callback(this.course?.title ?? "unknown course");
    }, 1000);

}

const cb4= (title:string) => console.log("Save successful.", title);

saveCourse4({title:"Typescript Bootcamp"}, cb4);