var CourseType;
(function (CourseType) {
    //FREE = 9, PREMIUM= 8, PRIVATE= 7, HIDDEN= 6
    CourseType["FREE"] = "FREE";
    CourseType["PREMIUM"] = "PREMIUM";
    CourseType["PRIVATE"] = "PRIVATE";
    CourseType["HIDDEN"] = "HIDDEN";
})(CourseType || (CourseType = {}));
var course = {
    title: 'Typescript',
    type: CourseType.PREMIUM
};
console.log(course);
