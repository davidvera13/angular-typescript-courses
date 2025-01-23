import * as dotenv from 'dotenv';

// check if we have .env file
const result = dotenv.config();
if (result.error) {
    console.error("error loading environment variables, aborting");
    // Error: ENOENT: no such file or directory, open
    console.log(result.error);
    process.exit(1);
}

import "reflect-metadata";
import {AppDataSource} from "../../data-source";
import {Course} from "../course";
import {Lesson} from "../lesson";
import {User} from "../user";
//import {User} from "./user";

async function deleteDb() {
    await AppDataSource.initialize();
    console.log(`Database connection ready.`);
    console.log(`Clearing LESSONS table.`);
    await AppDataSource.getRepository(Lesson).delete({});
    console.log(`Clearing COURSES table.`);
    await AppDataSource.getRepository(Course).delete({});
    console.log(`Clearing USERS table.`);
    await AppDataSource.getRepository(User).delete({});

}


deleteDb()
    .then(() => {
        console.log(`Finished deleting database, exiting!`);
        process.exit(0);
    })
    .catch(err => {
        console.error(`Error deleting database.`, err);
    });