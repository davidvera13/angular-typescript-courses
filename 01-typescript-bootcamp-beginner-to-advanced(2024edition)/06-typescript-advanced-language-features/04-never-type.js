var anyValue;
var courseStatus;
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
function unexpectedError(value) {
    throw new Error("Unexpected value: ".concat(value));
}
