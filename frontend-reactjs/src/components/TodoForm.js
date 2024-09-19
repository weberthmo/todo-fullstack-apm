import React, { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim()) {
      addTodo({
        description,
        completed: false,
      });
      setDescription("");
    }
  };

  return (
    <form id="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="description"
        placeholder="New Task"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TodoForm;
