// type is 'Typescript course' > literal type
const title = "Typescript course";
// type is string
let subTitle = "Learning typeScript";

// type is 10 > literal type
const lessonCount = 10;
// type is number
let total = 100;

// we define here default allowed values with literal type
let pageSize: 10 | 15 | 20 = 10;
// TS2322: Type 16 is not assignable to type 10 | 15 | 20
// pageSize = 16; // here value can be changed ...
pageSize = 20;

//let courseStatus: "draft" | "published" | "unpublished" | "archived" = "draft";
type courseStatusType = "draft" | "published" | "unpublished" | "archived";
let courseStatus: courseStatusType = "draft";
courseStatus = "unpublished";

// better to use interfaces for such objects
type courseType = { title: string, subTitle: string, lessonCount: number};

let course: courseType = {
    title: "Type script fundamentals",
    subTitle: "Everything you want to know on TypeScript",
    lessonCount: 24
}