var age5 = 35;
function saveCourse5(course, callback) {
    var _this = this;
    this.course = course;
    setTimeout(function () {
        var _a, _b;
        callback((_b = (_a = _this.course) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : "unknown course");
    }, 1000);
}
var cb5 = function (title) { return console.log("Save successful.", title); };
saveCourse5({ title: "Typescript Bootcamp" }, cb5);
//# sourceMappingURL=test5.js.map