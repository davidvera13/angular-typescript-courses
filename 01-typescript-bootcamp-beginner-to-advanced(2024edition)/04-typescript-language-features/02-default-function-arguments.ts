// this function takes 3 arguments but not we have default values set if no argument is passed...
// following signatures are allowed:
// > no arguments
// > title: subtitle will have value SUBTITLE...
// > title + subtitle: lessonsCount will have value 0 by default...
// > title + subtitle + lessonsCount
function printCourse(
    title = "TITLE",
    subtitle = "SUBTITLE",
    lessonsCount = 0) {
    console.log(`Title: ${title}, Subtitle: ${subtitle}, lessons count: ${lessonsCount}`);
}

printCourse(
    "Typescript Bootcamp",
    "Learn the language fundamentals, build practical projects",
    10);

printCourse(
    "Typescript Bootcamp",
    "Learn the language fundamentals, build practical projects"
);

printCourse("Typescript Bootcamp");

printCourse();