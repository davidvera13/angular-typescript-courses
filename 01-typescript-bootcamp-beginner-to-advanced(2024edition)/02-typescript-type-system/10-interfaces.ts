// interface can be extended...
interface Course {
    title: string;
    readonly subTitle: string;
    //lessonCount?: number;
}
interface Course {
    lessonCount?: number;
}

const tsCourse: Course = {
    title: "Type script fundamentals",
    subTitle: "Everything you want to know on TypeScript",
    lessonCount: 24
}

// we update ...
tsCourse.title = "Hello World";
console.log(tsCourse);
//tsCourse.subTitle = "I can't update readonly properties";



const angularCourse: Course = {
    title: "Angular fundamentals",
    subTitle: "Everything you want to know on Angular",
    //lessonCount: 49
}