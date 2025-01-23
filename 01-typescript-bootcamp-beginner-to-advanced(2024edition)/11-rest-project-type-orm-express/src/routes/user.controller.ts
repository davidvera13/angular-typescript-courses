import {Request, Response, NextFunction} from "express";
import {logger} from "../logger";
import {AppDataSource} from "../data-source";
import {User} from "../models/user";
import {calculatePasswordHash} from "../helpers/utils";
const crypto = require("crypto");

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Allow user to login and retrieve a jwt token
 * curl -X POST http://localhost:9003/api/login -H "Content-Type:application/json" -d "{\"email\": \"test@me.com\", \"password\":\"test\"}"
 * curl -X POST http://localhost:9003/api/login -H "Content-Type:application/json" -d '{\"email\": \"admin@me.com\", \"password\":\"admin\"}'
 * @param request
 * @param response
 * @param next
 */
export async function authenticate(request: Request, response: Response, next:NextFunction) {

    try {

        logger.debug(`Called login()`);
        const {email, password} = request.body;

        if (!email) {
            throw `Could not extract the email from the request, aborting.`;
        }

        if (!password) {
            throw `Could not extract the plain text password from the request, aborting.`;
        }

        const user = await AppDataSource
            .getRepository(User)
            .createQueryBuilder("users")
            .where("email = :email", {email})
            .getOne();

        if (!user) {
            const message = `Login denied.`;
            logger.info(`${message} - ${email}`);
            response.status(403).json({message});
            return;
        }

        const passwordHash = await calculatePasswordHash(password, user.passwordSalt);

        if (passwordHash != user.passwordHash) {
            const message = `Login denied.`;
            logger.info(`${message} - user with ${email} has entered the wrong password.`);
            response.status(403).json({message});
            return;
        }

        logger.info(`User ${email} has now logged in.`);

        const {pictureUrl, isAdmin} = user;

        // jwt claims
        const authJwt = {
            userId: user.id,
            email,
            isAdmin
        };

        const authJwtToken = await jwt.sign(authJwt, JWT_SECRET);

        response.status(200).json({
            user: {
                email,
                pictureUrl,
                isAdmin
            },
            authJwtToken
        });

    }
    catch(error) {
        logger.error(`Error calling login()`);
        return next(error);
    }

}


/**
 * Allow to create a new user with user role
 * curl -X POST http://localhost:9003/api/users -H "Content-Type:application/json" -d "{\"email\": \"new-user@me.com\", \"pictureUrl\":\"https://avatars.githubusercontent.com/u/123456\", \"password\": \"test123\", \"isAdmin\": false}"
 *
 * with admin jwt creation works:
 * curl -X POST http://localhost:9003/api/users -H "Content-Type:application/json" -d "{\"email\": \"new-user2@me.com\", \"pictureUrl\":\"https://avatars.githubusercontent.com/u/123456\", \"password\": \"test123\", \"isAdmin\": false}" -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiYWRtaW5AbWUuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzM3NTkxMTYyfQ.P0vxngnDhZnil_R9x4r7oHDOqjVpx71_ZSHlWHIYpsk"
 * with user jwt:
 * curl -X POST http://localhost:9003/api/users -H "Content-Type:application/json" -d "{\"email\": \"new-user3@me.com\", \"pictureUrl\":\"https://avatars.githubusercontent.com/u/123456\", \"password\": \"test123\", \"isAdmin\": false}" -H "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidGVzdEBtZS5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzM3NTkxNDEzfQ.nBYSO6v-7aYcdRneEHs2d8mrF9JsFK-yFKCMVHUAWJ8"
 * Forbidden
 */
export async function createUser(
    request: Request, response: Response, next:NextFunction) {

    try {
        logger.debug(`Called createUser()`);
        const {email, pictureUrl, password, isAdmin} = request.body;

        if (!email) {
            throw "Could not extract the email from the request, aborting.";
        }

        if (!password) {
            throw  "Could not extract the plain text password from the request, aborting."
        }

        const repository = AppDataSource.getRepository(User);

        // find user by email : retrieve if user exists or not
        const user = await repository.createQueryBuilder("users")
            .where("email = :email", {email})
            .getOne();

        if (user) {
            const message = `User with email ${email} already exists, aborting.`;
            logger.error(message);
            response.status(500).json({message});
            return;
        }

        const passwordSalt = crypto.randomBytes(64).toString('hex');
        const passwordHash = await calculatePasswordHash(password, passwordSalt);

        const newUser = repository.create({
            email,
            pictureUrl,
            isAdmin,
            passwordHash,
            passwordSalt
        });

        await AppDataSource.manager.save(newUser);

        logger.info(`User ${email} has been created.`);

        response.status(200).json({
            email,
            pictureUrl,
            isAdmin
        });

    }
    catch (error) {
        logger.error(`Error calling createUser()`);
        return next(error);
    }

}