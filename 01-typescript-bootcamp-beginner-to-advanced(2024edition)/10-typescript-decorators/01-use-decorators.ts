// this class has no method for persistence, logging, monitoring...
// We could extend a class that has this ability (for example : BaseDbService)
// we could extend a class that logs (for example: LogService)
// we could extend a class for performance monitoring (for example: PerfService)
// there is no way to have multiple inheritance: we can use decorators (meta programming)

import {Log, LoggingLevel, Perf} from "./02-method-decorator";
import {SealClass} from "./03-class-decorator";
import {DatabaseId} from "./04-property-decorators";


// to prevent any extension at runtime
@SealClass()
// @DatabaseService
class DbService {
    // extends BaseDbService, LogService, PerfService{

    @Perf()
    @Log(LoggingLevel.INFO)
    saveData(data:any) {
        console.log(`saving data in the database...`);
    }

    @Log(LoggingLevel.INFO)
    deleteData(data:any) {
        console.log(`deleting data in the database...`);
    }

    noLogs(data:any) {
        console.log(`no logs called...`);
    }
}

class Course {
    @DatabaseId()
    id:string;
    title:string;

    constructor(title:string) {
        this.title = title;
    }

    print(message:string) {
        console.log(`${message}, Course ${this.title}, id ${this.id}`);
    }
}




const db = new DbService();
db.saveData({hello: "World"});

// after using sealed class annotation:
// TypeError: Cannot define property noLogs, object is not extensible
// Object.defineProperty(DbService, "noLogs",{
//     value: () => {
//         console.log("Hello World");
//     }
// })




const course1 = new Course("Typescript Bootcamp");
console.log(`Course 1 id: `, course1.id);

const course2 = new Course("Angular Core In Depth");
console.log(`Course 2 id: `, course2.id);
console.log("Course 1", course1);
console.log("Course 2", course2);