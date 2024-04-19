import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
// import TodoApp from './TodoApp.jsx'
import './index.css'

const initialTodos = [
  { title: 'Learn React', id: 0, checked: false },
  { title: 'Be Awesome!', id: 1, checked: false },
  { title: 'Finish this app', id: 2, checked: false },
];

export default function TodoApp() {
    const [todos, setTodos] = useState(initialTodos);
  
    const handleCheckboxChange = (id) => {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      ));
    }

    return (
      <>
      <div className="container">
      <section className='title-page'>
          <h1>My Todo App</h1>
      </section>
  
      <hr />
  
      <section className='add-section'>
          <form className='add-form'>
              <input type='text' className='add-input' placeholder='Type a new Todo'/>
              <button className='add-button'>Add Todo</button>
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodoApp />
  </React.StrictMode>,
)