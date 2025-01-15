interface Course {
    title:string;
    subtitle:string;
    lessonsCount: number;
}

// we convert object onto immutable object
function freezeCourse(
    course:Course): Readonly<Course> {
    return Object.freeze(course);
}

const frozen = freezeCourse({
    title: "Typescript Bootcamp",
    subtitle: "Learn the language, build practical projects",
    lessonsCount: 100
});

// TS2540: Cannot assign to title because it is a read-only property.
// frozen.title = "";