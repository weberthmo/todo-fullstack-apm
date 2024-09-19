import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./style.css";

const apiUrl = "http://localhost:4000/todos";

const App = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async (todo) => {
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    fetchTodos();
  };

  const updateTodo = async (id, updatedTodo) => {
    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo),
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container">
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </div>
  );
};

export default App;
