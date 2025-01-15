interface Course6 {
    title:string;
    subtitle?: string;
    lessonsCount?:number;
}


function saveCourse6(course: Course6, callback: Function) {
    this.course = course;
    setTimeout(() => {
        callback(this.course?.title ?? "unknown course");
    }, 1000);

}

const cb6 = (title:string) => console.log("Save successful.", title);

saveCourse6({title:"Typescript Bootcamp"}, cb6);