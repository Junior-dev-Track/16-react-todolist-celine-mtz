import { useState, useRef } from "react";

export default function TodoForm({ handleAdd }) {
    // states
    const inputRef = useRef();
    const categoryRef = useRef();

    // comportements
    const handleSubmit = (event) => {
        event.preventDefault();

        const newTodo = inputRef.current.value;
        const newCategory = categoryRef.current.value;
        
        if(newTodo === '') return alert('Please enter a todo');
        else {
            const id = new Date().getTime();
            // const name = newTodo;

            const todoToAdd = {name: newTodo, id, done: false, category: newCategory};
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
                <div className="todo-choices">
                    <input 
                        type='text' 
                        className='add-input' 
                        placeholder='Type a new Todo' 
                        ref={inputRef} />
                    <select name='category' id='category-select' className='category-select' ref={categoryRef}>
                        <option value="None">Choose a category</option>
                        <option value="None">None</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                    </select>
                </div>
            <button type='submit' className='add-button'>Add Todo</button>
        </form>
    );
}