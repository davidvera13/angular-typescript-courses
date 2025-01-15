var age4 = 35;
function saveCourse4(course, callback) {
    var _this = this;
    this.course = course;
    setTimeout(function () {
        var _a, _b;
        callback((_b = (_a = _this.course) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : "unknown course");
    }, 1000);
}
var cb4 = function (title) { return console.log("Save successful.", title); };
saveCourse4({ title: "Typescript Bootcamp" }, cb4);
//# sourceMappingURL=test4.js.map