// partial interface
export interface Course {
    title:string;
    subtitle:string;
    lessonsCount: number;
}

// the updateCourse calls have errors
// export function updateCourse(
//     courseId:string,
//     update: Course) {
//     // do something
//     console.log(update);
// }

export function updateCourse(
    courseId:string,
    update: Partial<Course>) {
    // do something
    console.log(update);
}

// we can pass "partial" object:
// interface requires mandatory properties: title, subtitle and lesson count...
// we could also set all Course interface optional but it would not solve all updates combinations
// (like title with lesson count)
updateCourse("1", {
    title: "New version of title"
});

updateCourse("1", {
    subtitle: "New version of subtitle"
});

updateCourse("1", {
    title: "New version of title",
    lessonsCount: 100
});