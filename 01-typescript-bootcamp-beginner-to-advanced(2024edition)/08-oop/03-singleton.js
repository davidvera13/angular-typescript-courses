"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesService = void 0;
var CoursesService = /** @class */ (function () {
    function CoursesService() {
        console.log("The CoursesService was initialized.");
    }
    CoursesService.instance = function () {
        if (!CoursesService.INSTANCE) {
            CoursesService.INSTANCE = new CoursesService();
        }
        return CoursesService.INSTANCE;
    };
    return CoursesService;
}());
exports.CoursesService = CoursesService;
