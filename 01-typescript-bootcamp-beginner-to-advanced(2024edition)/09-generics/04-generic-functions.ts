interface Course {
    title:string;
    subtitle:string;
    lessonsCount: number;
}

interface Lesson {
    title:string;
    seqNo:number;
}

// if we want an immutable object of each interface, we should declare 2 functions
// 1 that takes Course object, 1 that take Lesson object as parameter.
// note we have code duplication: generic can reduce those 2 functions onto a single one

export function freezeCourse(course:Course): Readonly<Course> {
    return Object.freeze(course);
}

function freezeLesson(lesson:Lesson): Readonly<Lesson> {
    return Object.freeze(lesson);
}

// we can create a generic function instead:
// we can pass any type T that extends object: it's a constraint, without it could accept any type such as number...
// as output we retrieve a readonly of the type T
function freeze<T extends object>(input: T): Readonly<T> {
    return Object.freeze(input);
}

const course: Course = {
    title: "Typescript Bootcamp",
    subtitle: "Learn the language, build practical projects",
    lessonsCount: 100
}

const frozenCourse = freeze(course);

// TS2345: Argument of type string is not assignable to parameter of type object
// const frozenNumber = freeze("10");

//frozenCourse.title = "";

const frozenLesson = freeze({
    title: "Lesson Title",
    seqNo: 10
})