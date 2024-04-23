import { useState } from "react";

export default function Todo({ todos, todoInfo, editingTodo, setTodos, setEditingTodo }) {
    // const [editingTodo, setEditingTodo] = useState(null);

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
        <li key={todoInfo.id}>
            <input 
            type='checkbox'
            id={todoInfo.id}
            name={todoInfo.name}
            checked={todoInfo.done}
            onChange={() => handleCheckboxChange(todoInfo.id)}
            key={todoInfo.id}
            /> <span className={`todo-name ${todoInfo.done ? 'strikeThrough' : ''}`}>
            {editingTodo && editingTodo.id === todoInfo.id ? (
                <input 
                    type='text' 
                    value={editingTodo.name}
                    className="editInput"
                    onChange={(e) => setEditingTodo({ ...editingTodo, name: e.target.value })}
                    onKeyPress={(e) => {
                        if (e.key == 'Enter') {
                        handleSaveEdit(todoInfo.id, editingTodo.name);
                        }
                    }}
                    />
            ) : (
                todoInfo.name
            )}
            </span>
            {editingTodo && editingTodo.id === todoInfo.id ? (
                <button type='submit' onClick={() => handleSaveEdit(todoInfo.id, editingTodo.name)} className="buttonSave">Save</button>
            ) : (
                <button onClick={() => handleEdit(todoInfo.id)} className="buttonEdit">Edit</button>
            )}

            <button 
            onClick={() => handleDelete(todoInfo.id)} 
            className={`buttonDelete ${todoInfo.done ? 'buttonDeleteChecked' : ''}`}
            disabled={!todoInfo.done}
            > Delete Todo
            </button>
        </li>
    );
}