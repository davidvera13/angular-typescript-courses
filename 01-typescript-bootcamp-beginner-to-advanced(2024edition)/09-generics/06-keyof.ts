const course: Course = {
    title: "Typescript Bootcamp",
    subtitle: "Learn the language, build practical projects",
    lessonsCount: 100
}


// type CourseKeys = "title" | "subtitle" | "lessonsCount"
// first type is equivalent to first one...
type CourseKeys = keyof Course;

// let's do use keyof in a method:
// we accept an object and a property name, and returns an object value
export function extractProperty<T, K extends keyof T>(data: T, property:K) {
    return data[property];
}

const val = extractProperty(course, "lessonsCount");
console.log(val)

// TS2345: Argument of type "lessonsCount2" is not assignable to parameter of type keyof Course
// const val2 = extractProperty(course, "lessonsCount2");
