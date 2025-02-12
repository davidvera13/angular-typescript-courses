import React, { useRef } from "react";
import './newTodo.css';

type NewTodoProps = {
    onAddTodo: (message: string) => void
}

const NewTodo: React.FC<NewTodoProps> = (props) => {
    // get user input and forward value to App.tsx
    const textInputRef = useRef<HTMLInputElement>(null);
    const onSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const message = textInputRef.current!.value;
        console.log(message!);
        // return message to the parent component
        props.onAddTodo(message);
    }
    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                <label htmlFor='todo-message'>Message</label>
                <br/>
                <input type='text' id='todo-message' ref = {textInputRef} />
                <br/>
                <button type='submit'>Add</button>
            </div>
        </form>
    )
}

export default NewTodo;