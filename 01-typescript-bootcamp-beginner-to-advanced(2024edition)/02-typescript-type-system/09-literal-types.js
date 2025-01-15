// type is 'Typescript course' > literal type
var title = "Typescript course";
// type is string
var subTitle = "Learning typeScript";
// type is 10 > literal type
var lessonCount = 10;
// type is number
var total = 100;
// we define here default allowed values with literal type
var pageSize = 10;
// TS2322: Type 16 is not assignable to type 10 | 15 | 20
// pageSize = 16; // here value can be changed ...
pageSize = 20;
var courseStatus = "draft";
courseStatus = "unpublished";
var course = {
    title: "Type script fundamentals",
    subTitle: "Everything you want to know on TypeScript",
    lessonCount: 24
};
