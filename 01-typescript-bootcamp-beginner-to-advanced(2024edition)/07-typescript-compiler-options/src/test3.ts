
interface Course3 {
    title:string;
    subtitle?: string;
    lessonsCount?:number;
}

let age3 = 35;

function saveCourse3(course: Course3, callback: Function) {
    this.course = course;
    setTimeout(() => {
        callback(this.course?.title ?? "unknown course");
    }, 1000);

}

const cb3 = (title:string) => console.log("Save successful.", title);

saveCourse3({title:"Typescript Bootcamp"}, cb3);