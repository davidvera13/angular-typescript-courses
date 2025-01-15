"use strict";
// this class has no method for persistence, logging, monitoring...
// We could extend a class that has this ability (for example : BaseDbService)
// we could extend a class that logs (for example: LogService)
// we could extend a class for performance monitoring (for example: PerfService)
// there is no way to have multiple inheritance: we can use decorators (meta programming)
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _02_method_decorator_1 = require("./02-method-decorator");
var _03_class_decorator_1 = require("./03-class-decorator");
var _04_property_decorators_1 = require("./04-property-decorators");
// to prevent any extension at runtime
var DbService = /** @class */ (function () {
    // @DatabaseService
    function DbService() {
    }
    // extends BaseDbService, LogService, PerfService{
    DbService.prototype.saveData = function (data) {
        console.log("saving data in the database...");
    };
    DbService.prototype.deleteData = function (data) {
        console.log("deleting data in the database...");
    };
    DbService.prototype.noLogs = function (data) {
        console.log("no logs called...");
    };
    __decorate([
        (0, _02_method_decorator_1.Perf)(),
        (0, _02_method_decorator_1.Log)(_02_method_decorator_1.LoggingLevel.INFO)
    ], DbService.prototype, "saveData", null);
    __decorate([
        (0, _02_method_decorator_1.Log)(_02_method_decorator_1.LoggingLevel.INFO)
    ], DbService.prototype, "deleteData", null);
    DbService = __decorate([
        (0, _03_class_decorator_1.SealClass)()
        // @DatabaseService
    ], DbService);
    return DbService;
}());
var Course = /** @class */ (function () {
    function Course(title) {
        this.title = title;
    }
    Course.prototype.print = function (message) {
        console.log("".concat(message, ", Course ").concat(this.title, ", id ").concat(this.id));
    };
    __decorate([
        (0, _04_property_decorators_1.DatabaseId)()
    ], Course.prototype, "id", void 0);
    return Course;
}());
var db = new DbService();
db.saveData({ hello: "World" });
// after using sealed class annotation:
// TypeError: Cannot define property noLogs, object is not extensible
// Object.defineProperty(DbService, "noLogs",{
//     value: () => {
//         console.log("Hello World");
//     }
// })
var course1 = new Course("Typescript Bootcamp");
console.log("Course 1 id: ", course1.id);
var course2 = new Course("Angular Core In Depth");
console.log("Course 2 id: ", course2.id);
console.log("Course 1", course1);
console.log("Course 2", course2);
