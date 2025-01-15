// we convert object onto immutable object
function freezeCourse(course) {
    return Object.freeze(course);
}
var frozen = freezeCourse({
    title: "Typescript Bootcamp",
    subtitle: "Learn the language, build practical projects",
    lessonsCount: 100
});
// TS2540: Cannot assign to title because it is a read-only property.
// frozen.title = "";
