import { useState, useRef } from "react";

export default function TodoForm({ handleAdd }) {
    // states
    const inputRef = useRef();

    // comportements
    const handleSubmit = (event) => {
        event.preventDefault();

        const newTodo = inputRef.current.value;
        
        if(newTodo === '') return alert('Please enter a todo');
        else {
            const id = new Date().getTime();
            const name = newTodo;

            const todoToAdd = {name, id, done: false};
            handleAdd(todoToAdd);
        }
        inputRef.current.value = '';
    };

    // render
    return (
        <form 
            action="submit" 
            onSubmit={handleSubmit} 
            className='add-form' >
            <input 
                type='text' 
                className='add-input' 
                placeholder='Type a new Todo' 
                ref={inputRef} />
            <button type='submit' className='add-button'>Add Todo</button>
        </form>
    );
}