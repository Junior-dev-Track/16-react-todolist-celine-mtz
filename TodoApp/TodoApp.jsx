import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import Todo from "./components/Todo";

function TodoApp() {
    // states
    const firstTodo = { name: 'Write my first todo', id: 0, done: false };
    const initialTodos = JSON.parse(localStorage.getItem('todos')) || [
      firstTodo,
    ];
    const [todos, setTodos] = useState(initialTodos);
    const [reinitializeKey, setReinitializeKey] = useState(0);
    const [editingTodo, setEditingTodo] = useState(null);

    // Save list
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    // comportements
    const handleAdd = (todoToAdd) => {
      const todoCopy = [...todos];
      todoCopy.push(todoToAdd);
      setTodos(todoCopy);
    };
    
    const reinitializeTodoList = () => {
      localStorage.removeItem('todos');
      setTodos([firstTodo]);
      setReinitializeKey(prevKey => prevKey + 1);
    }

    // affichage (render)
    return (
      <>
      <section className='title-page'>
          <h1>My Todo list</h1>
      </section>

      <main className="container">
        <section className="content">
          <div className='add-section'>
            <TodoForm handleAdd={handleAdd} />
          </div>
    
          <div className="todo-list">
              <h2>My Todos</h2>
              <ul>
                  {todos.map((todo) => (
                    <Todo 
                      todos={todos}
                      todoInfo={todo} 
                      editingTodo={editingTodo}
                      setTodos={setTodos}
                      setEditingTodo={setEditingTodo}
                    />
                  ))}
              </ul>
          </div>

          <div key={reinitializeKey}>
            <button className='buttonReinitialize' onClick={reinitializeTodoList}>Reinitialize Todo List</button>
          </div>
        </section>
      </main>
      </>
    );
 }

 export default TodoApp;
