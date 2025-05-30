import {DataSource} from "typeorm";
import {Course} from "./models/course";
import {Lesson} from "./models/lesson";
import {User} from "./models/user";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    ssl: false,
    //extra: {
    //    ssl : {
    //        rejectUnauthorized:false
    //    }
    //},
    entities: [
        // tables must be listed here ...
        Course, Lesson, User
    ],
    // this will allow to update tables on db
    synchronize: true,
    logging:true
})