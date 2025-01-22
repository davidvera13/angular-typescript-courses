import {Request, Response} from "express";

export function root(
    request: Request,
    response: Response) {
    //request.headers
    response.status(200)
        .send("<h1>Express server is up and running and updated ... </h1>");
}
