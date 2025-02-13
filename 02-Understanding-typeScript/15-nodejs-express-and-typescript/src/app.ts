// 1. import express
// we need :
// npm i --save-dev @types/node
// npm i --save-dev @types/express
//const express = require('express');
import express, { Request, Response, NextFunction } from 'express';
import todoRoutes from "./routes/todo.routes";
import {json} from "body-parser";

const app = express();
app.use(json());
app.use('/todos', todoRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction): any => {
    res.status(500).json({ message: err.message });
});
app.listen(3000);