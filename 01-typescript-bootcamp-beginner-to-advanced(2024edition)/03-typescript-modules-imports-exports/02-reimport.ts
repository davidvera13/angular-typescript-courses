// as we reexport in index.ts, no need to declare path to index: index is default
import {Course, loadAllCourses, saveCourse} from  "./module-reexports"

// we can use methods in module-reexports
saveCourse();
loadAllCourses();
