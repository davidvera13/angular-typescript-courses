function createCourse(title, subtitle, lessonsCount) {
    console.log(" Creating course with Title: ".concat(title, ", \n    Subtitle: ").concat(subtitle, " lessons count: ").concat(lessonsCount));
    return {
        title: title,
        subtitle: subtitle,
        lessonsCount: lessonsCount
    };
}
var result = createCourse("Typescript Bootcamp", "Learn the language fundamentals", 100);
console.log(typeof createCourse);