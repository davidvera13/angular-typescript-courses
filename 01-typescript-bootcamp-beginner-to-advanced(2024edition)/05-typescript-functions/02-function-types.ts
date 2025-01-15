interface Course {
    title:string;
    subtitle: string;
    lessonsCount:number;
}

type CreateCourse = (
    title:string,
    subtitle:string,
    lessonsCount:number) => Course;

type OnCourseCreated = (course: Course) => void;

// arguments are the same as in type CreateCourse
const createCourse = (title:string, subtitle:string, lessonsCount:number, callback: OnCourseCreated) => {
    console.log(` Creating course with Title: ${title}, 
    Subtitle: ${subtitle} lessons count: ${lessonsCount}`);
    const course = {
        title,
        subtitle,
        lessonsCount
    };

    callback(course);
    return course;
}

console.log(typeof createCourse);