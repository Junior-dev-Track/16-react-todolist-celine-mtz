import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import Todo from "./components/Todo";

const LSKEY = 'MyTodoApp';

function TodoApp() {
    // states
    const firstTodo = { name: 'Write my first todo', id: 0, done: false };
    const initialTodos = JSON.parse(localStorage.getItem(LSKEY + '.todos')) || [
      firstTodo,
    ];
    const [todos, setTodos] = useState(initialTodos);
    const [reinitializeKey, setReinitializeKey] = useState(0);
    
    // const anyDoneTodo = false;

    // Save list
    useEffect(() => {
      window.localStorage.setItem(LSKEY + '.todos', JSON.stringify(todos));
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

    const nbrTodoDone = () => {
      let nbrDone = 0;
      todos.forEach(todo => {
        if(todo.done) nbrDone++;
      });
      return nbrDone;
    }

    const deleteDoneTodos = () => {
      const todoCopy = [...todos];
      const todoCopyUpdated = todoCopy.filter((todo) => todo.done === false);
      setTodos(todoCopyUpdated);
    }

    const checkAnyDoneTodo = () => {
      let anyDoneTodo = false;
      const todoCopy = [...todos];
      anyDoneTodo = todoCopy.some((todo) => todo.done === true);
      return anyDoneTodo;
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
            <TodoForm 
              handleAdd={handleAdd} 
              />
          </div>
    
          <div className="todo-list">
              <h2>My Todos</h2>
              <div className="stats-todo">
                <p className="nbr-todo">Created tasks: {todos.length}</p>
                <p className="nbr-done">Done: {nbrTodoDone()} on {todos.length}</p>
              </div>
              <ul>
                  {todos.map((todo) => (
                    <Todo 
                      key={todo.id}
                      todos={todos}
                      todoInfo={todo} 
                      setTodos={setTodos}
                    />
                  ))}
              </ul>

              <div key={reinitializeKey} class='delete-div'>
                <div>
                  <button
                    type='button'
                    className='buttonReinitialize'
                    onClick={reinitializeTodoList}
                    >
                      <span class='buttonReinitializeText'>Reinitialize Todo List</span>
                      <img src="../src/sync.png" alt="Reinitialize Todo List" class='buttonReinitializeIcon icon'/>
                  </button>
                </div>

                <div>
                  <button
                    type='button'
                    className={`buttonDeleteManyTodo ${checkAnyDoneTodo() ? 'buttonDeleteManyTodoChecked' : ''}`}
                    // className="buttonDeleteManyTodo"
                    onClick={deleteDoneTodos}
                    >
                      <span class='buttonDeleteManyTodoText'>Delete finished Todos</span>
                      <img src="../src/deleteAll.png" alt="Delete finished Todos" class='buttonDeleteManyTodoIcon icon'/>
                  </button>
                </div>
              </div>
          </div>
        </section>
      </main>
      </>
    );
 }

 export default TodoApp;
