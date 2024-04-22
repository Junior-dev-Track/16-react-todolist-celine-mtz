import { useState, useEffect } from "react";

function TodoApp() {
    // states
    const initialTodos = JSON.parse(localStorage.getItem('todos')) || [
      { name: 'Write my first todo', id: 0, done: false },
    ];
    const [todos, setTodos] = useState(initialTodos);
    const [newTodo, setNewTodo] = useState('');

    // Save list
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    // comportements
    const handleSubmit = (event) => {
      event.preventDefault();
      
      const id = new Date().getTime();
      const name = newTodo;

      const todoToAdd = {name, id, done: false};
      handleAdd(todoToAdd);
      setNewTodo('');
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
    
      // setTodos(todos.map(todo =>
      //   todo.id === id ? { ...todo, done: !todo.done } : todo
      // ));
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
                        {todo.name} </span>
                      <button 
                        onClick={() => handleDelete(todo.id)} 
                        className={`buttonDelete ${todo.done ? 'buttonDeleteChecked' : ''}`}
                        disabled={!todo.done}
                        >  Delete Todo
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