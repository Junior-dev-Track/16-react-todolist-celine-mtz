import { useState } from "react";

export default function TodoApp() {
    // states
    const initialTodos = [
      { title: 'Learn React', id: 0, checked: false },
      { title: 'Be Awesome!', id: 1, checked: false },
      { title: 'Finish this app', id: 2, checked: false },
    ];
    const [todos, setTodos] = useState(initialTodos);

    // comportements
  
    const handleCheckboxChange = (id) => {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      ));
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("coucou")
      //TODO finish here
      // https://codesandbox.io/p/sandbox/learn-react-in-1h-nn9jxj?file=%2Fsrc%2FApp.js%3A35%2C11-35%2C21
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
              <input type='text' className='add-input' placeholder='Type a new Todo'/>
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
                      /> {todo.title}
                  </li>
              ))}
          </ul>
      </section>
      </div>
      </>
      );
  }