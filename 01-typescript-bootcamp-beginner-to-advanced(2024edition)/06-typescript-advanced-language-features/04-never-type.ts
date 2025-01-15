let anyValue:any;
// Type undefined is not assignable to type never
// let neverValue : never = undefined;
// neverValue["property"] = 10;

type CourseStatus = "draft" | "published" | "unpublished";

let courseStatus : CourseStatus;

if (courseStatus == "draft") {
    console.log("We have a draft status");
}
else if (courseStatus == "published") {
    console.log("We have a published status");
}
else if (courseStatus == "unpublished") {
    console.log("We have a unpublished status");
}
else {
    // never ??
    unexpectedError(courseStatus);
}

function unexpectedError(value:never) {
    throw new Error(`Unexpected value: ${value}`);
}