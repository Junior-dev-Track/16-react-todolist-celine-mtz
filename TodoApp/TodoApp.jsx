import { useState, useEffect } from "react";

function TodoApp() {
    // states
    const initialTodos = JSON.parse(localStorage.getItem('todos')) || [
      { name: 'Write my first todo', id: 0, done: false },
    ];
    const [todos, setTodos] = useState(initialTodos);
    const [newTodo, setNewTodo] = useState('');
    const [editingTodo, setEditingTodo] = useState(null);

    // Save list
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

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

    const handleAdd = (todoToAdd) => {
      const todoCopy = [...todos];
      todoCopy.push(todoToAdd);
      setTodos(todoCopy);
    };

    const handleChange = (event) => {
      setNewTodo(event.target.value);
    };

    const handleCheckboxChange = (id) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.done = !todo.done;
        }
        return todo;
      });
      setTodos(newTodos);
    }

    const handleEdit = (id) => {
      const todo = todos.find(todo => todo.id === id);
      setEditingTodo(todo);
    }

    const handleSaveEdit = (id, newName) => {
      const newTodos = todos.map(todo => todo.id === id ? {...todo, name: newName } : todo);
      setTodos(newTodos);
      setEditingTodo(null); // Corrected typo and state variable name
    }

    const handleDelete = (id) => {
      const todoCopy = [...todos];
      const todoCopyUpdated = todoCopy.filter((todo) => todo.id !== id);
      setTodos(todoCopyUpdated);
    };

    // affichage (render)
    return (
      <>
      <section className='title-page'>
          <h1>My Todo list</h1>
      </section>
      <main className="container">
  
      <section className="content">
      <div className='add-section'>
          <form action="submit" onSubmit={handleSubmit} className='add-form'>
              <input value={newTodo} type='text' className='add-input' placeholder='Type a new Todo' onChange={handleChange}/>
              <button type='submit' className='add-button'>Add Todo</button>
          </form>
      </div>
  
      <div className="todo-list">
          <h2>My Todos</h2>
          <ul>
              {todos.map((todo) => (
                 <li key={todo.id}>
                      <input 
                        type='checkbox'
                        id={todo.id}
                        name={todo.name}
                        checked={todo.done}
                        onChange={() => handleCheckboxChange(todo.id)}
                        key={todo.id}
                        /> <span className={`todo-name ${todo.done ? 'strikeThrough' : ''}`}>
                        {editingTodo && editingTodo.id === todo.id ? (
                            <input 
                                type='text' 
                                value={editingTodo.name} 
                                onChange={(e) => setEditingTodo({ ...editingTodo, name: e.target.value })}
                            />
                        ) : (
                            todo.name
                        )}
                      </span>
                      {editingTodo && editingTodo.id === todo.id ? (
                          <button onClick={() => handleSaveEdit(todo.id, editingTodo.name)} className="buttonSave">Save</button>
                      ) : (
                          <button onClick={() => handleEdit(todo.id)} className="buttonEdit">Edit</button>
                      )}
                      <button 
                        onClick={() => handleDelete(todo.id)} 
                        className={`buttonDelete ${todo.done ? 'buttonDeleteChecked' : ''}`}
                        disabled={!todo.done}
                        > Delete Todo
                      </button>
                 </li>
              ))}
          </ul>
      </div>
      </section>
      </main>
      </>
      );
 }

 export default TodoApp;
