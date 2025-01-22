import * as dotenv from 'dotenv';

// check if we have .env file
const result = dotenv.config();
if (result.error) {
    console.error("error loading environment variables, aborting");
    // Error: ENOENT: no such file or directory, open
    console.log(result.error);
    process.exit(1);
}


import {AppDataSource} from "../../data-source";
import {COURSES, USERS} from "./db-data";
import {DeepPartial} from "typeorm";
import {Course} from "../course";
import {Lesson} from "../lesson";

async function populateDb() {

    await AppDataSource.initialize();
    console.log(`Database connection ready.`);
    // DeepPartial is orm enhancement of Partial object. It includes nested object
    const courses = Object.values(COURSES) as DeepPartial<Course>[];

    const courseRepository = AppDataSource.getRepository(Course);
    const lessonsRepository = AppDataSource.getRepository(Lesson);

    for (let courseData of courses) {
        console.log(`Inserting course ${courseData.title}`);
        const course = courseRepository.create(courseData);
        await courseRepository.save(course);
        for (let lessonData of courseData.lessons) {
            console.log(`Inserting lesson ${lessonData.title}`);
            const lesson = lessonsRepository.create(lessonData);
            lesson.course = course
            await lessonsRepository.save(lesson);
        }
    }

    //const users = Object.values(USERS) as any[];
    //for (let userData of users) {
    //    console.log(`Inserting user: ${userData}`);
    //    const {email, pictureUrl, isAdmin, passwordSalt, plainTextPassword} = userData;
    //    const user = AppDataSource
    //        .getRepository(User)
    //        .create({
    //            email,
    //            pictureUrl,
    //            isAdmin,
    //            passwordSalt,
    //            passwordHash: await calculatePasswordHash(
    //                plainTextPassword, passwordSalt)
    //        });
    //    await AppDataSource.manager.save(user);
    //}

    const totalCourses = await courseRepository
        .createQueryBuilder()
        .getCount();

    const totalLessons = await lessonsRepository
        .createQueryBuilder()
        .getCount();

    console.log(` Data Inserted - courses ${totalCourses}, lessons ${totalLessons}`);
}

populateDb()
    .then(() => {
        console.log(`Finished populating database, exiting!`);
        process.exit(0);
    })
    .catch(err => {
        console.error(`Error populating database.`, err);
    });