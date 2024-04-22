import { useState } from "react";

function TodoApp() {
    // states
    const initialTodos = [
      { title: 'Learn React', id: 0, checked: false },
      { title: 'Be Awesome!', id: 1, checked: false },
      { title: 'Finish this app', id: 2, checked: false },
    ];
    const [todos, setTodos] = useState(initialTodos);
    const [newTodo, setNewTodo] = useState('');

    // comportements
    const handleSubmit = (event) => {
      event.preventDefault();
      
      const id = new Date().getTime();
      const title = newTodo;

      const todoToAdd = {title, id, checked: false};
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
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      ));
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
                        checked={todo.checked}
                        onChange={() => handleCheckboxChange(todo.id)}
                        key={todo.id}
                      /> {todo.title} <button onClick={() => handleDelete(todo.id)} className='buttonDelete'>Delete Todo</button>
                  </li>
              ))}
          </ul>
      </section>
      </div>
      </>
      );
  }

  export default TodoApp;