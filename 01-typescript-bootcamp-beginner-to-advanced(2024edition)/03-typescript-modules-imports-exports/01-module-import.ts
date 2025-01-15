import {Course, COURSE, PAGE_SIZE} from "./01-module-export";

// we can use PAGE_SIZE because : we import the module and have
// export key word before const declaration
const pageSize = PAGE_SIZE;
const course: Course = COURSE;
console.log(pageSize);
console.log(course);

// re export
export {
    PAGE_SIZE as MAX_PAGE_SIZE
}

//import printCourse, {COURSE_TOTAL, TYPESCRIPT_COURSE } from "./03-default-exports";
//printCourse(course);
// won't import printCourse
import * as constants from "./03-default-exports";
import printCourse from "./03-default-exports";
console.log(constants.COURSE_TOTAL);
console.log(constants.TYPESCRIPT_COURSE);
printCourse(course);