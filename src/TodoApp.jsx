import React, { useState, useEffect, useRef } from "react";
import TodoForm from "./components/TodoForm";
import Todo from "./components/Todo";

const LSKEY = 'MyTodoApp';

function TodoApp() {
    const filterRef = useRef();
    // states
    const firstTodo = { 
      name: 'Write my first todo', 
      id: 0, 
      done: false,
      category: 'None'
    };
    const initialTodos = JSON.parse(localStorage.getItem(LSKEY + '.todos')) || [
      firstTodo,
    ];
    const [todos, setTodos] = useState(initialTodos);
    const [filteredTodos, setFilteredTodos] = useState(todos);
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
      setFilteredTodos(todoCopy);
    };

    const reinitializeTodoList = () => {
      localStorage.removeItem('todos');
      setTodos([firstTodo]);
      setFilteredTodos([firstTodo]);
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
      setFilteredTodos(todoCopyUpdated);
    }

    const checkAnyDoneTodo = () => {
      let anyDoneTodo = false;
      const todoCopy = [...todos];
      anyDoneTodo = todoCopy.some((todo) => todo.done === true);
      return anyDoneTodo;
    }

    const handleFilter = () => {
      const todoCopy = [...todos];
      if(filterRef.current.value === 'All')
        setFilteredTodos(todoCopy);
      else {
        const todoFiltered = todoCopy.filter((todo) => todo.category === filterRef.current.value);
        setFilteredTodos(todoFiltered);
      }
    }

    const handleDelete = (id) => {
      const todoCopyUpdated = todos.filter((todo) => todo.id !== id);
      setTodos(todoCopyUpdated);
      setFilteredTodos(todoCopyUpdated);
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

              <div className="filter-todos">
                <select 
                  name='category' 
                  id='category-filter' 
                  className='category-select'
                  onChange={handleFilter}
                  ref={filterRef}>
                    <option value="All">All</option>
                    <option value="None">No category</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                </select>
              </div>
              
              <ul>
                  {filteredTodos.map((todo) => (
                    <Todo 
                      key={todo.id}
                      todos={todos}
                      todoInfo={todo} 
                      setTodos={setTodos}
                      // setfilteredTodos={setFilteredTodos}
                      handleDelete={handleDelete}
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
                      <img src="../src/images/sync.png" alt="Reinitialize Todo List" class='buttonReinitializeIcon icon'/>
                  </button>
                </div>

                <div>
                  <button
                    type='button'
                    className={`buttonDeleteManyTodo ${checkAnyDoneTodo() ? 'buttonDeleteManyTodoChecked' : ''}`}
                    onClick={deleteDoneTodos}
                    >
                      <span class='buttonDeleteManyTodoText'>Delete finished Todos</span>
                      <img src="../src/images/deleteAll.png" alt="Delete finished Todos" class='buttonDeleteManyTodoIcon icon'/>
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
