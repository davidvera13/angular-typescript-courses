let age = 35;
function saveCourse(course, callback) {
    this.course = course;
    setTimeout(() => {
        callback(this.course?.title ?? "unknown course");
    }, 1000);
}
const cb = (title) => console.log("Save successful.", title);
saveCourse({ title: "Typescript Bootcamp" }, cb);
