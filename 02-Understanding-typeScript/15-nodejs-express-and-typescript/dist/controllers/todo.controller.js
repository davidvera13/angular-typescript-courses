"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_model_1 = require("../models/todo.model");
// faking database storage
const TODOS = [];
const createTodo = (req, res, next) => {
    const todo = new todo_model_1.TodoModel(Math.random().toString(), req.body.text);
    TODOS.push(todo);
    res.status(201)
        .json({
        message: 'Created successfully.',
        createTodo: todo
    });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.status(200)
        .json({ todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo!');
    }
    TODOS[todoIndex] = new todo_model_1.TodoModel(TODOS[todoIndex].id, updatedText);
    res.status(200)
        .json({
        message: 'Updated successfully.',
        updatedTodo: TODOS[todoIndex]
    });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo!');
    }
    TODOS.splice(todoIndex, 1);
    res.json({ message: 'Deleted successfully.' });
};
exports.deleteTodo = deleteTodo;
