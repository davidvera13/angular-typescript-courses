var courseRecord = ["Typescript Bootcamp", "Learn the language fundamentals", 100];
function createCourse(title, subtitle) {
    console.log(" Creating course with Title: ".concat(title, ", Subtitle: ").concat(subtitle, " "));
    return [title, subtitle, 100];
}
function createCourseFull(title, subtitle, lessonCount) {
    console.log(" Creating course with Title: ".concat(title, ", Subtitle: ").concat(subtitle, " and ").concat(lessonCount, " lessons"));
    return [title, subtitle, lessonCount];
}
createCourse("Typescript Bootcamp", "Learn the language fundamentals");
createCourseFull("Typescript Bootcamp", "Learn the language fundamentals", 125);
