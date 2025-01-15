"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_PAGE_SIZE = void 0;
var _01_module_export_1 = require("./01-module-export");
Object.defineProperty(exports, "MAX_PAGE_SIZE", { enumerable: true, get: function () { return _01_module_export_1.PAGE_SIZE; } });
var pageSize = _01_module_export_1.PAGE_SIZE;
var course = _01_module_export_1.COURSE;
console.log(pageSize);
console.log(course);
var constants = require("03-default-exports");
var _03_default_exports_1 = require("03-default-exports");
console.log(constants.COURSE_TOTAL);
console.log(constants.TYPESCRIPT_COURSE);
(0, _03_default_exports_1.default)(course);
//# sourceMappingURL=01-module-import.js.map