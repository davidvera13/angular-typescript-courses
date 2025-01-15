import {HasId, HasTitle} from "./02-interfaces";
import {CoursesService} from "./03-singleton";

// uses OOP
const currentDate = new Date();

class OldCourse {
    // shared to all instances
    public static TOTAL_COURSES = 0;
    static readonly TYPESCRIPT_TITLE = "wow";

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
    constructor(
       private _title: string,
       //private subtitle: string,
       private subtitle = "this is my default vluae",
       private readonly _createdAt: Date = new Date()) {
        OldCourse.TOTAL_COURSES++;
    }

    updateTitle(newTitle: string) {
        this.title = newTitle;
    }

    //setDate() {
    //    // Attempt to assign to const or readonly variable
    //    this.createdAt = new Date();
    //}

    // getters and setters
    get age() {
        const ageInMs = new Date().getTime() - this._createdAt.getTime();
        return Math.round(ageInMs / 1000 / 60 / 24);
    }

    set title(newTitle: string) {
        this._title = newTitle;
    }

    get title() {
        return this._title;
    }

    get createdAt() {
        return this._createdAt;
    }

}


const baseCourse = new OldCourse(
    "JS For Beginners",
    "Cool",
    new Date());
console.log("TOTAL_COURSES", OldCourse.TOTAL_COURSES);

const baseCourse2 = new OldCourse(
    "JS For Beginners");
console.log("TOTAL_COURSES", OldCourse.TOTAL_COURSES);
console.log("**********************");

console.log("course createdAt : ", baseCourse.createdAt)

// members variable are no longer available
//baseCourse.title = "new title";
//baseCourse.subtitle = "new subtitle";
//baseCourse.createdAt = new Date();

// we can change values using methods:
baseCourse.updateTitle('new title');



// abstract class
abstract class Course implements HasTitle {
    private static TOTAL_COURSES = 0;
    static readonly TYPESCRIPT_TITLE = "Typescript Bootcamp";

    protected constructor(
        public id:string,
        protected _title:string,
        protected price:number,
        protected subtitle = "",
        protected creationDt = new Date(2000,1,1)
    ) {

        this.validate();
        const service = CoursesService.instance();
        Course.TOTAL_COURSES++;

    }

    printId() {
        console.log(`The course id is ${this.id}`);
    }

    protected abstract validate();

    static printTitle(course: Course) {
        console.log(`The title of the course ${course.title}`)
    }

    get title() {
        return this._title;
    }

    set title(newTitle:string) {
        if (!newTitle) {
            throw "Title cannot be empty";
        }

        this._title = newTitle;
    }

    // calculate "age"
    get age() {
        const ageInMs = new Date().getTime() - this.creationDt.getTime();
        return Math.round(ageInMs / 1000 / 60 / 24);
    }

}

class FreeCourse extends Course {
    constructor(
        id:string,
        title:string,
        subtitle = "",
        creationDt = new Date(2000,1,1)) {

        super(id, title, 0, subtitle, creationDt);
    }

    protected validate() {
        console.log(`Called FreeCourse validate()`);
    }

}

//const typescript = new Course(Course.TYPESCRIPT_TITLE, 100);

//console.log(typescript.title);

const angular = new FreeCourse("1", "Angular For Beginners");

CoursesService.instance();

console.log(angular);