import {Request, Response, NextFunction} from "express";
import {logger} from "../logger";
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

export function isAuthenticated(
    request: Request, response: Response, next:NextFunction) {
    const authJwtToken = request.headers.authorization;

    if (!authJwtToken) {
        logger.info(`The authentication JWT is not present, access denied.`);
        response.sendStatus(403);
        return;
    }

    checkJwtValidity(authJwtToken)
        .then(user => {
            logger.info(`Authentication JWT successfully decoded:`, user);
            request["user"] = user;
            next();
        })
        .catch(err => {
            logger.error(`Could not validate the authentication JWT, access denied.`, err);
            response.sendStatus(403);
        });
}

/**
 * called isAuthenticated, so we have at this stage the user information: request["user"] = user (cf. line 19)
 * @param request
 * @param response
 * @param next
 */
export function isAdmin(request: Request, response: Response, next:NextFunction) {
    const user = request["user"];
    if (!user?.isAdmin) {
        logger.error(`The user is not an admin, access denied`);
        response.sendStatus(403);
        return;
    }

    logger.debug(`The user is a valid admin, granting access.`);
    next();

}

async function checkJwtValidity(authJwtToken:string) {
    const user = await jwt.verify(authJwtToken, JWT_SECRET);
    logger.info("Found user details in JWT:", user);
    return user;
}