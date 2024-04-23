import { useState } from "react";

export default function Todo({ todos, todoInfo, editingTodo, setTodos, setEditingTodo }) {
    const todoInfoID = todoInfo.id;

    const handleDelete = (id) => {
        const todoCopy = [...todos];
        const todoCopyUpdated = todoCopy.filter((todo) => todo.id !== id);
        setTodos(todoCopyUpdated);
    };

    const handleCheckboxChange = (id) => {
        const newTodos = todos.map((todo) => {
          if (todo.id === id) {
            todo.done = !todo.done;
          }
          return todo;
        });
        setTodos(newTodos);
    };

    const handleEdit = (id) => {
        const todo = todos.find(todo => todo.id === id);
        setEditingTodo(todo);
      };
  
      const handleSaveEdit = (id, newName) => {
        const newTodos = todos.map(todo => todo.id === id ? {...todo, name: newName } : todo);
        setTodos(newTodos);
        setEditingTodo(null); // Corrected typo and state variable name
      };

    return (
        <li>
            <input 
                type='checkbox'
                id='todoInfoID'
                name={todoInfo.name}
                checked={todoInfo.done}
                onChange={() => handleCheckboxChange(todoInfoID)}
            /> 
            <label htmlFor='todoInfoID' className={`todo-name ${todoInfo.done ? 'strikeThrough' : ''}`}>
            {editingTodo && editingTodo.id === todoInfoID ? (
                <input 
                    type='text' 
                    value={editingTodo.name}
                    className="editInput"
                    onChange={(e) => setEditingTodo({ ...editingTodo, name: e.target.value })}
                    onKeyPress={(e) => {
                        if (e.key == 'Enter') {
                        handleSaveEdit(todoInfoID, editingTodo.name);
                        }
                    }}
                    />
            ) : (
                todoInfo.name
            )}
            </label>
            {editingTodo && editingTodo.id === todoInfoID ? (
                <button 
                    type='submit'
                    onClick={() => handleSaveEdit(todoInfoID, editingTodo.name)}
                    className="buttonSave"
                >
                    Save
                </button>
            ) : (
                <button 
                    type='button'
                    onClick={() => handleEdit(todoInfoID)} 
                    className="buttonEdit"
                >
                    Edit
                </button>
            )}

            <button 
                onClick={() => handleDelete(todoInfoID)} 
                className={`buttonDelete ${todoInfo.done ? 'buttonDeleteChecked' : ''}`}
                disabled={!todoInfo.done}
                type='button'
            > 
                Delete Todo
            </button>
        </li>
    );
}