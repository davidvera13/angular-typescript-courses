var createCourse = function (title, subtitle, lessonsCount, callback) {
    console.log(" Creating course with Title: ".concat(title, ", \n    Subtitle: ").concat(subtitle, " lessons count: ").concat(lessonsCount));
    var course = {
        title: title,
        subtitle: subtitle,
        lessonsCount: lessonsCount
    };
    callback(course);
    return course;
};
console.log(typeof createCourse);
