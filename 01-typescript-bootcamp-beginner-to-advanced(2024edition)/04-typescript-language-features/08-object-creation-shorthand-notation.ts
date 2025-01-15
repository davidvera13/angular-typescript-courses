interface Course {
    title:string;
    subtitle: string;
    lessonsCount:number;
}

const title = "Typescript Bootcamp";
const subtitle = "Learn the language fundamentals, build practical projects";
const lessonsCount = 10;

// if key name has same name as value property, we can remove key
const oldCourse: Course = {
    title: title,
    subtitle: subtitle,
    lessonsCount: lessonsCount
}
// here is the result
const course:Course = {
    title,
    subtitle,
    lessonsCount
};