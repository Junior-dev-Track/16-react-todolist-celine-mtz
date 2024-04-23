import { useState, useRef } from "react";

export default function TodoForm({ handleAdd }) {
    // states
    // const [newTodo, setNewTodo] = useState('');
    const inputRef = useRef(null);

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

    // const handleChange = (event) => {
    //     setNewTodo(event.target.value);
    // };

    // render
    return (
        <form action="submit" onSubmit={handleSubmit} className='add-form'>
            <input 
                type='text' 
                className='add-input' 
                placeholder='Type a new Todo' 
                // onChange={handleChange}
                ref={inputRef} />
            <button type='submit' className='add-button'>Add Todo</button>
        </form>
    );
}