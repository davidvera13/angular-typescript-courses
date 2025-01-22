import {Request, Response, NextFunction} from "express";
import {logger} from "../logger";

export function defaultErrorHandler(
    error: any, request: Request, response: Response, next:NextFunction) {

    logger.error(`Default error handler triggered; reason: `, error);
    console.log("request", request);
    console.log("response", response);
    if (response.headersSent) {
        logger.error(`Response was already being written, delegating to built-in Express error handler.`);
        return next(error);
    }

    response.status(500).json({
        status: "error",
        message: "Default error handling triggered, check logs: " + error
    });

}