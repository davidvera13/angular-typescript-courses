// using element
// function App() {
//   return (
//     <>
//       <div className="App">
//           Hello ...
//       </div>
//     </>
//   )
// }

import React, { useState } from "react";
import TodoList from "./components/todoList.tsx";
import NewTodo from "./components/newTodo.tsx";
import {Todo} from "./models/todo.model.tsx";

// using React.FC / React.FunctionComponent
const App: React.FunctionComponent = () =>  {
    // const todos = [
    //     { id: 1, message: 'complete course' },
    //     { id: 2, message: 'mastering course' },
    //     { id: 3, message: 'Launch project' },
    // ]

    const [todos, setTodos] = useState<Todo[]>([
        { id: "1", message: 'complete course' },
        { id: "2", message: 'mastering course' },
        { id: "3", message: 'Launch project' }
    ]);

    const todoAddHandler = (message: string) => {
        console.log(message);
        let id = Math.random().toString();
        //setTodos([...todos, {id: id, message: message}])
        // be sure we have latest state
        setTodos(previousState => [...previousState, {id: id, message: message}])
    }

    const todoDeleteHandler = (id: string) => {
        setTodos(previousState => {
            return previousState.filter((item) => item.id !== id);
        })
    }


    return (
        <div className="App">
            {/*  injecting component that adds todos  */}
            <NewTodo onAddTodo = {todoAddHandler} />
            {/*  injecting todos component */}
            <TodoList items = {todos}  onDeleteTodo = { todoDeleteHandler }/>
        </div>
    )
}

export default App
