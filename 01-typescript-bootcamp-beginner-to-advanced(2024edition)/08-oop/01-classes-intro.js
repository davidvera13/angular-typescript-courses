"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _03_singleton_1 = require("./03-singleton");
// uses OOP
var currentDate = new Date();
var OldCourse = /** @class */ (function () {
    //// by default, member variable are visible and mutable...
    //// we can make variables private: encapsulation
    //private title: string;
    //private subtitle: string;
    //private createdAt: Date;
    //
    //constructor(
    //    title: string,
    //    subtitle: string,
    //    createdAt: Date) {
    //    this.title = title;
    //   this.subtitle = subtitle;
    //    this.createdAt = createdAt;
    //}
    // easier way to declare properties
    // readonly: immutable
    // we can't have multiple constructor: we fix this using default value
    function OldCourse(_title, 
    //private subtitle: string,
    subtitle, _createdAt) {
        if (subtitle === void 0) { subtitle = "this is my default vluae"; }
        if (_createdAt === void 0) { _createdAt = new Date(); }
        this._title = _title;
        this.subtitle = subtitle;
        this._createdAt = _createdAt;
        OldCourse.TOTAL_COURSES++;
    }
    OldCourse.prototype.updateTitle = function (newTitle) {
        this.title = newTitle;
    };
    Object.defineProperty(OldCourse.prototype, "age", {
        //setDate() {
        //    // Attempt to assign to const or readonly variable
        //    this.createdAt = new Date();
        //}
        // getters and setters
        get: function () {
            var ageInMs = new Date().getTime() - this._createdAt.getTime();
            return Math.round(ageInMs / 1000 / 60 / 24);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OldCourse.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (newTitle) {
            this._title = newTitle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OldCourse.prototype, "createdAt", {
        get: function () {
            return this._createdAt;
        },
        enumerable: false,
        configurable: true
    });
    // shared to all instances
    OldCourse.TOTAL_COURSES = 0;
    OldCourse.TYPESCRIPT_TITLE = "wow";
    return OldCourse;
}());
var baseCourse = new OldCourse("JS For Beginners", "Cool", new Date());
console.log("TOTAL_COURSES", OldCourse.TOTAL_COURSES);
var baseCourse2 = new OldCourse("JS For Beginners");
console.log("TOTAL_COURSES", OldCourse.TOTAL_COURSES);
console.log("**********************");
console.log("course createdAt : ", baseCourse.createdAt);
// members variable are no longer available
//baseCourse.title = "new title";
//baseCourse.subtitle = "new subtitle";
//baseCourse.createdAt = new Date();
// we can change values using methods:
baseCourse.updateTitle('new title');
// abstract class
var Course = /** @class */ (function () {
    function Course(id, _title, price, subtitle, creationDt) {
        if (subtitle === void 0) { subtitle = ""; }
        if (creationDt === void 0) { creationDt = new Date(2000, 1, 1); }
        this.id = id;
        this._title = _title;
        this.price = price;
        this.subtitle = subtitle;
        this.creationDt = creationDt;
        this.validate();
        var service = _03_singleton_1.CoursesService.instance();
        Course.TOTAL_COURSES++;
    }
    Course.prototype.printId = function () {
        console.log("The course id is ".concat(this.id));
    };
    Course.printTitle = function (course) {
        console.log("The title of the course ".concat(course.title));
    };
    Object.defineProperty(Course.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (newTitle) {
            if (!newTitle) {
                throw "Title cannot be empty";
            }
            this._title = newTitle;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Course.prototype, "age", {
        // calculate "age"
        get: function () {
            var ageInMs = new Date().getTime() - this.creationDt.getTime();
            return Math.round(ageInMs / 1000 / 60 / 24);
        },
        enumerable: false,
        configurable: true
    });
    Course.TOTAL_COURSES = 0;
    Course.TYPESCRIPT_TITLE = "Typescript Bootcamp";
    return Course;
}());
var FreeCourse = /** @class */ (function (_super) {
    __extends(FreeCourse, _super);
    function FreeCourse(id, title, subtitle, creationDt) {
        if (subtitle === void 0) { subtitle = ""; }
        if (creationDt === void 0) { creationDt = new Date(2000, 1, 1); }
        return _super.call(this, id, title, 0, subtitle, creationDt) || this;
    }
    FreeCourse.prototype.validate = function () {
        console.log("Called FreeCourse validate()");
    };
    return FreeCourse;
}(Course));
//const typescript = new Course(Course.TYPESCRIPT_TITLE, 100);
//console.log(typescript.title);
var angular = new FreeCourse("1", "Angular For Beginners");
_03_singleton_1.CoursesService.instance();
console.log(angular);
