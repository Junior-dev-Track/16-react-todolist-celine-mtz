import { useState } from "react";

export default function TodoForm({ handleAdd }) {
    // states
    const [newTodo, setNewTodo] = useState('');

    // comportements
    const handleSubmit = (event) => {
        event.preventDefault();
        
        if(newTodo === '') return alert('Please enter a todo');
        else {
            const id = new Date().getTime();
            const name = newTodo;

            const todoToAdd = {name, id, done: false};
            handleAdd(todoToAdd);
            setNewTodo('');
        }
    };

    const handleChange = (event) => {
        setNewTodo(event.target.value);
    };

    // render
    return (
        <form action="submit" onSubmit={handleSubmit} className='add-form'>
            <input 
                value={newTodo} 
                type='text' 
                className='add-input' 
                placeholder='Type a new Todo' 
                onChange={handleChange}/>
            <button type='submit' className='add-button'>Add Todo</button>
        </form>
    );
}