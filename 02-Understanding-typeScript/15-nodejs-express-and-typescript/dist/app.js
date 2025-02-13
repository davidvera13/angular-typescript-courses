"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// 1. import express
// we need :
// npm i --save-dev @types/node
// npm i --save-dev @types/express
//const express = require('express');
const express_1 = __importDefault(require("express"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
const body_parser_1 = require("body-parser");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use('/todos', todo_routes_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
app.listen(3000);
