import {Response, Request, NextFunction} from "express";
import {logger} from "../logger";
import {AppDataSource} from "../data-source";
import {Course} from "../models/course";
import {Lesson} from "../models/lesson";
import {isInteger} from "../helpers/utils";

/**
 * retrieve all course from db
 * @param request
 * @param response
 * @param next
 */
export async function getAllCourses(
    request: Request, response: Response, next: NextFunction) {

    try {
        logger.debug(`getAllCourses() Called`);
        //logger.debug(`getAllCourses() Called`, request["user"]);

        const courses = await AppDataSource
            .getRepository(Course)
            .createQueryBuilder("courses")
            .leftJoinAndSelect("courses.lessons", "LESSONS")
            .orderBy("courses.seqNo")
            .getMany();
        // throw 'Ooops, fake error';
        response.status(200).json({courses});

    }
    catch (error) {
        logger.error(`Error calling getAllCourses()`);
        return next(error);
    }
}


/**
 * get course by url (url slug)
 * @param request
 * @param response
 * @param next
 */
export async function getCourseByCourseUrl(
    request: Request, response: Response, next: NextFunction) {
    try {
        logger.debug(`Called findCourseByUrl()`);
        const courseUrl = request.params.courseUrl;

        if (!courseUrl) {
            throw `Could not extract the course url from the request.`;
        }

        const course = await AppDataSource
            .getRepository(Course)
            .findOne({
                where: {url: courseUrl},
                relations: ["lessons"]
            });
            // we can also return single course without lessons ...
            // .findOneBy({
            //     url: courseUrl
            // });

        if (!course) {
            const message = `Could not find a course with url ${courseUrl}`;
            logger.error(message);
            response.status(404).json({message});
            return;
        }

        const totalLessons = await AppDataSource
            .getRepository(Lesson)
            .createQueryBuilder("lessons")
            .where("lessons.courseId = :courseId", {
                courseId: course.id
            })
            .getCount();

        response.status(200).json({
            course,
            totalLessons
        });

    }
    catch (error) {
        logger.error(`Error calling getAllCourses()`);
        return next(error);
    }
}

/**
 * Get request to retrieve course lessons with pagination
 * @param request
 * @param response
 * @param next
 */
export async function getCourseLessons(
    request: Request, response: Response, next: NextFunction) {
    try {
        logger.debug(`Called getCourseLessons()`);
        const courseId = request.params.courseId;

        // retrieve url params and define default values if not set ...
        const query = request.query as any;
        const pageNumber = query?.pageNumber ?? "0";
        const pageSize = query?.pageSize ?? "3";

        if (!isInteger(courseId)) {
            throw `Invalid course id ${courseId}`;
        }

        if (!isInteger(pageNumber)) {
            throw `Invalid pageNumber ${pageNumber}`;
        }

        if (!isInteger(pageSize)) {
            throw `Invalid pageSize ${pageSize}`;
        }

        const lessons = await AppDataSource
            .getRepository(Lesson)
            .createQueryBuilder("lessons")
            .where("lessons.courseId  = :courseId ", {courseId})
            // we will take page 1, 2, 3 with 10 as page size... so we have to skip 0 element for 1st page, 10 elements for 2nd page...
            .skip(pageNumber * pageSize)
            // we take 10 elements if page size is 10
            .take(pageSize)
            .getMany();

        response.status(200).json({lessons});
    }
    catch (error) {
        logger.error(`Error calling getCourseLessons()`);
        return next(error);
    }
}

/**
 * Allow to update an existing course in the database
 * works with cmder:
 * curl -X PATCH http://localhost:9003/api/courses/16 -H "Content-Type:application/json" -d "{\"title\":\"Typescript Bootcamp v2\"}"
 *
 * Using powershell:
 * Invoke-RestMethod -Uri "http://localhost:9003/api/courses/16" `
 *     -Method PATCH `
 *     -Headers @{ "Content-Type" = "application/json" } `
 *     -Body '{"title":"Typescript Bootcamp v2"}'
 */
export async function updateCourse(
    request: Request, response: Response, next:NextFunction) {

    try {
        logger.debug(`Called updateCourse()`);
        const courseId = request.params.courseId;
        const updatedCourse  = request.body;

        if (!isInteger(courseId)) {
            throw `Invalid course id ${courseId}`;
        }
        await AppDataSource
            .createQueryBuilder()
            .update(Course)
            .set(updatedCourse)
            .where("id = :courseId", {courseId})
            .execute();

        response.status(200).json({
            message: `Course ${courseId} was updated successfully.`
        });

    } catch (error) {
        logger.error(`Error calling updateCourse()`);
        return next(error);
    }
}

/**
 * Create course endpoint
 * curl -X POST http://localhost:9003/api/courses -H "Content-Type:application/json" -d "{\"url\": \"firebase-bootcamp\", \"title\": \"Firebase Bootcamp\", \"iconUrl\": \"https://xxxxxx.s3-us-west-1.amazonaws.com/course-images/firebase-course-1.jpg\",\"longDescription\": \"Complete guided tour to the Firebase ecosystem.\", \"category\": \"BEGINNER\"}"
 *
 * Invoke-RestMethod -Uri "http://localhost:9003/api/courses" `
 *     -Method POST `
 *     -Headers @{ "Content-Type" = "application/json" } `
 *     -Body '{"url": "firebase-bootcamp", "title": "Firebase Bootcamp", "iconUrl": "https://xxxxxx.s3-us-west-1.amazonaws.com/course-images/firebase-course-1.jpg","longDescription": "Complete guided tour to the Firebase ecosystem.", "category": "BEGINNER"}'
 * @param request
 * @param response
 * @param next
 */
export async function createCourse(
    request: Request, response: Response, next:NextFunction) {

    try {
        logger.debug(`Called createCourse()`);
        const data = request.body;

        if (!data) {
            throw `No data available, cannot save course.`;
        }

        const course = await AppDataSource.manager.transaction(
            // isolation level of transaction: value seqNo won't be changed until transaction completed
            "REPEATABLE READ",
            async (transactionalEntityManager) => {
                // create a repository to persist data using transaction entity manager
                const repository = transactionalEntityManager.getRepository(Course);

                // seqNo must be created automatically by endpoint and must be unique
                // we select the max value of this seqNo and we increment by 1 to order courses logically
                const result = await repository
                    .createQueryBuilder("courses")
                    .select("MAX(courses.seqNo)", "max")
                    .getRawOne();

                const course = repository
                    .create({
                        ...data,
                        seqNo: ( result?.max ?? 0 ) + 1
                    });

                await repository.save(course);

                return course;
            }
        );

        response.status(200).json({course});

    }
    catch (error) {
        logger.error(`Error calling createCourse()`);
        return next(error);
    }
}


/**
 * Allow to delete a course and all associated lessons
 * curl -X DELETE http://localhost:9003/api/courses/11
 * @param request
 * @param response
 * @param next
 */
export async function deleteCourseAndLessons(
    request: Request, response: Response, next:NextFunction) {

    try {
        logger.debug(`Called deleteCourseAndLessons()`);
        const courseId = request.params.courseId;

        if (!isInteger(courseId)) {
            throw `Invalid courseId ${courseId}`;
        }

        await AppDataSource.manager.transaction(
            async (transactionalEntityManager) => {

                await transactionalEntityManager
                    .createQueryBuilder()
                    .delete()
                    .from(Lesson)
                    .where("courseId = :courseId", {courseId})
                    .execute();

                await transactionalEntityManager
                    .createQueryBuilder()
                    .delete()
                    .from(Course)
                    .where("id = :courseId",{courseId})
                    .execute();
            }
        );

        response.status(200).json({
            message: `Course deleted successfully ${courseId}`
        });
    }
    catch (error) {
        logger.error(`Error calling deleteCourseAndLessons()`);
        return next(error);
    }
}