import React from "react";
import './todoList.css';

interface TodoListProps {
    items: { id: string, message: string }[];
    onDeleteTodo: (id: string) => void
}

const TodoList: React.FC<TodoListProps> = (props) => {
    // const todos = [
    //     { id: 1, message: 'complete course' },
    //     { id: 2, message: 'mastering course' },
    //     { id: 3, message: 'Launch project' },
    // ]
    return (
        <>
            <ul>
                {props.items.map(todo => (
                    <li key={todo.id}>
                        <span>{todo.message}</span>
                        <button onClick={props.onDeleteTodo.bind(null, todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default TodoList;