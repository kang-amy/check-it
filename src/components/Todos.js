import React, { useState, useEffect, useContext } from 'react' 
import { CredentialsContext } from '../App';

export default function Todos() {
    const [todos, setTodos] = useState([]);
    const [todoText, setTodoText] = useState("");
    const [credentials] = useContext(CredentialsContext);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
      fetch(`/todos`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials.username}:${credentials.password}`
        }
      }).then((response) => response.json())
      .then(todos => setTodos(todos));
    }, []);

    const persist = (newTodos) => {
      fetch(`/todos`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${credentials.username}:${credentials.password}`
        },
        body: JSON.stringify(newTodos),
      }).then(() => {});
      };

    const addTodo = (e) => {
        e.preventDefault();
        if (!todoText) return;
        const newTodo = { text: todoText, checked: false };
        const newTodos = [...todos, newTodo];
        setTodos(newTodos);
        setTodoText("");
        persist(newTodos);
    };

    const toggleTodo = (id) => {
      const newTodoList = [...todos];
      const todoItem = newTodoList.find(todo => todo._id === id);
      todoItem.checked = !todoItem.checked;
      setTodos(newTodoList);
      persist(newTodoList);
    };

    const getTodos = () => {
      return todos.filter(todo => filter === "all" ? todo : (filter === "finished" ? todo.checked : !todo.checked));
    };

    const changeFilter = (newFilter) => {
      setFilter(newFilter);
    };

  return (
    <div>
        <form onSubmit={ addTodo }>
        <input value={todoText} type="text" onChange={(e) => setTodoText(e.target.value)}/>
        <button type="submit">Add</button> 
        </form>
        <form>
          <label htmlFor="filter">Filter: </label>
          <select name="filter" id="filter" onChange={(e) => changeFilter(e.target.value) }>
            <option value="all">All</option>
            <option value="finished">Finished</option>
            <option value="unfinished">Unfinished</option>
          </select>
        </form>
        <div className="todo-container">
        {getTodos().map(todo => (
          <div className="todo-single"key={todo._id}>
            <input id={todo._id} onChange={() => toggleTodo(todo._id)} type="checkbox" checked={todo.checked}/>
            <label htmlFor={todo._id}>{todo.text}</label>
            <br/>
            </div>
        ))}
        </div>
    </div>
  )
}
