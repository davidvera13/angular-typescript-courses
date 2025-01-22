//console.log("Hello World");
// import * as express from 'express';
import * as dotenv from 'dotenv';
import cors from "cors";


// check if we have .env file
const result = dotenv.config();
if (result.error) {
    console.error("error loading environment variables, aborting");
    // Error: ENOENT: no such file or directory, open
    console.log(result.error);
    process.exit(1);
}

//console.log(process.env.PORT);
import "reflect-metadata";
import express from 'express';
import {root} from "./routes/root.controller";
import {isInteger} from "./helpers/utils";
import {logger} from "./logger";
import {AppDataSource} from "./data-source";
import {
    createCourse, deleteCourseAndLessons,
    getAllCourses,
    getCourseByCourseUrl,
    getCourseLessons,
    updateCourse
} from "./routes/courses.controller";
import {defaultErrorHandler} from "./middlewares/default-error-handler";
import bodyParser from "body-parser";

const app = express();

function setupExpress() {
    app.use(cors({origin:true}));
    app.use(bodyParser.json());

    app.route("/").get(root);
    app.route("/api/courses").get(getAllCourses);
    app.route("/api/courses/:courseUrl").get(getCourseByCourseUrl);
    app.route("/api/courses/:courseId/lessons").get(getCourseLessons);
    // put is for update, patch is for partial update
    app.route("/api/courses/:courseId").patch(updateCourse);
    app.route("/api/courses").post(createCourse);
    app.route("/api/courses/:courseId").delete(deleteCourseAndLessons);


    // what method is called to handle default exceptions
    app.use(defaultErrorHandler);
}

function startServer() {
    let port: number;
    // we can console arguments for launch server
    // reading from arguments:
    // "start-dev-server": "tsc-watch --onSuccess \"node dist/server.js 9901\"",
    //console.log(process.argv)
    //const port = parseInt(process.argv[2]);
    //console.log(port);
    const portArg = process.argv[2];
    // reading from env
    const portEnv = process.env.PORT;


    // check if we have port in .env
    if(isInteger(portEnv))
        port = parseInt(portEnv)

    // check if we have argument in start-dev-server
    if(!port && isInteger(portArg)) {
        port = parseInt(portArg);
    }

    // use default port
    if(!port)
        port = 9000

    // http://localhost:9000
    app.listen(port, () => {
        logger.info(`HTTP REST API Server is now running at http://localhost:${port}`);
    })
}


AppDataSource.initialize()
    .then(() => {
        logger.info("Datasource initialized");
        setupExpress();
        startServer();
    })
    .catch(err => {
        logger.error(err);
        process.exit(1);
    });