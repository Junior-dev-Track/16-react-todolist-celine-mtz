import { useState } from "react";

function TodoApp() {
    // states
    const initialTodos = [
      { name: 'Learn React', id: 0, done: false },
      { name: 'Be Awesome!', id: 1, done: false },
      { name: 'Finish this app', id: 2, done: false },
    ];
    const [todos, setTodos] = useState(initialTodos);
    const [newTodo, setNewTodo] = useState('');

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
      <div className="container">
      <section className='title-page'>
          <h1>My Todo App</h1>
      </section>
  
      <hr />
  
      <section className='add-section'>
          <form action="submit" onSubmit={handleSubmit} className='add-form'>
              <input value={newTodo} type='text' className='add-input' placeholder='Type a new Todo' onChange={handleChange}/>
              <button type='submit' className='add-button'>Add Todo</button>
          </form>
      </section>
  
      <hr />
  
      <section className="todo-list">
          <h2>Todos</h2>
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
                      /> <span className={`todo-name ${todo.done ? 'strikeThrough' : ''}`}>{todo.name}</span>
                      <button 
                        onClick={() => handleDelete(todo.id)} 
                        className={`buttonDelete ${todo.done ? 'buttonDeleteChecked' : ''}`}
                        disabled={!todo.done}
                      > Delete Todo
                      </button>
                  </li>
              ))}
          </ul>
      </section>
      </div>
      </>
      );
  }

  export default TodoApp;