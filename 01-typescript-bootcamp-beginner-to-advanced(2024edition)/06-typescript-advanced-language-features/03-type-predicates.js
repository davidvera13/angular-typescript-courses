var course = {
    title: "Typescript Bootcamp",
    subtitle: "Learn the language fundamentals, build practical projects",
    lessonsCount: 10
};
if (isCourse(course)) {
    console.log("We have a course ... ");
}
function isCourse(value) {
    var course = value;
    return (course === null || course === void 0 ? void 0 : course.title) != null && (course === null || course === void 0 ? void 0 : course.subtitle) != null;
}
isCourse(course);
