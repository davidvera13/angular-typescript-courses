
interface Course2 {
    title:string;
    subtitle?: string;
    lessonsCount?:number;
}


function saveCourse2(course: Course2, callback: Function) {
    this.course = course;
    setTimeout(() => {
        callback(this.course?.title ?? "unknown course");
    }, 1000);

}

const cb2 = (title:string) => console.log("Save successful.", title);

saveCourse2({title:"Typescript Bootcamp"}, cb2);