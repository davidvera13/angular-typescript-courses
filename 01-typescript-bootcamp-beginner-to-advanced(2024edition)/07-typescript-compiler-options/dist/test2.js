function saveCourse2(course, callback) {
    var _this = this;
    this.course = course;
    setTimeout(function () {
        var _a, _b;
        callback((_b = (_a = _this.course) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : "unknown course");
    }, 1000);
}
var cb2 = function (title) { return console.log("Save successful.", title); };
saveCourse2({ title: "Typescript Bootcamp" }, cb2);
//# sourceMappingURL=test2.js.map