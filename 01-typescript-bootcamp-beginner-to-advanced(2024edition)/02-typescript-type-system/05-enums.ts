enum CourseType {
    //FREE = 9, PREMIUM= 8, PRIVATE= 7, HIDDEN= 6
    FREE = "FREE", PREMIUM= "PREMIUM", PRIVATE= "PRIVATE", HIDDEN= "HIDDEN"
}

const course = {
    title: 'Typescript',
    type: CourseType.PREMIUM
}

console.log(course)