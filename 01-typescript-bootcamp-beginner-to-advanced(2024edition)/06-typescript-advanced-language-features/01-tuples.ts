interface Course {
    title:string;
    subtitle: string;
    lessonsCount:number;
}

type CourseRecord = [string, string, number];

const courseRecord: CourseRecord =
    ["Typescript Bootcamp","Learn the language fundamentals", 100];

function createCourse(title:string, subtitle:string): CourseRecord {
    console.log(` Creating course with Title: ${title}, Subtitle: ${subtitle} `);
    return [title, subtitle, 100];
}

function createCourseFull(title:string, subtitle:string, lessonCount: number): CourseRecord {
    console.log(` Creating course with Title: ${title}, Subtitle: ${subtitle} and ${lessonCount} lessons`);
    return [title, subtitle, lessonCount];
}

createCourse("Typescript Bootcamp","Learn the language fundamentals");
createCourseFull("Typescript Bootcamp","Learn the language fundamentals", 125);
