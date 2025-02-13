import {Request, Response, NextFunction, RequestHandler} from "express";
import {TodoModel} from "../models/todo.model";

// faking database storage
const TODOS: TodoModel[] = [];

export const createTodo: RequestHandler = (req: Request, res: Response, next: NextFunction)=> {
    const todo = new TodoModel(Math.random().toString(), (req.body as {text: string}).text);
    TODOS.push(todo);
    res.status(201)
        .json({
            message: 'Created successfully.',
            createTodo: todo
        });
};

export const getTodos: RequestHandler = (req: Request, res: Response, next: NextFunction) =>  {
    res.status(200)
        .json({todos: TODOS});
}

export const updateTodo: RequestHandler<{id: string}> = (req: Request, res: Response, next: NextFunction)=> {
    const todoId = req.params.id;
    const updatedText = (req.body as { text: string }).text;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo!');
    }

    TODOS[todoIndex] = new TodoModel(TODOS[todoIndex].id, updatedText);
    res.status(200)
        .json({
            message: 'Updated successfully.',
            updatedTodo: TODOS[todoIndex]
        });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo!');
    }
    TODOS.splice(todoIndex, 1);
    res.json({ message: 'Deleted successfully.' });
};

