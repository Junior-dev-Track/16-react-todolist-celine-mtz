import { useState } from "react";

export default function Todo({ todos, todoInfo, setTodos, handleDelete }) {
    const [editingTodo, setEditingTodo] = useState(null);
    
    const todoInfoID = todoInfo.id;

    // const handleDelete = (id) => {
    //     const todoCopy = [...todos];
    //     const todoCopyUpdated = todoCopy.filter((todo) => todo.id !== id);
    //     setTodos(todoCopyUpdated)
    //     setFilteredTodos(todoCopyUpdated);
    // };

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
            <div className="todo-label-operatations">
                <div className="checkbox-item">
                    <input 
                        type='checkbox'
                        id={`${todoInfoID}`}
                        name={todoInfo.name}
                        checked={todoInfo.done}
                        onChange={() => handleCheckboxChange(todoInfoID)}
                    /> 
                    <label htmlFor={`${todoInfoID}`} className={`todo-name ${todoInfo.done ? 'strikeThrough' : ''}`}>
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
                </div>
                
                <div className="edit-delete-button">
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
                            <img className='icon' src="../src/images/pen.png" alt="edit todo" />
                        </button>
                    )}

                    <button 
                        onClick={() => handleDelete(todoInfoID)} 
                        className={`buttonDelete ${todoInfo.done ? 'buttonDeleteChecked' : ''}`}
                        disabled={!todoInfo.done}
                        type='button'
                    > 
                        <img className='icon' src="../src/images/bin.png" alt="delete todo" />
                    </button>
                </div>
            </div>

            <div className="todo-category">
                <p>Category: {todoInfo.category}</p>
            </div>
        </li>
    );
}