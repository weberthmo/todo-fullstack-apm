import React from "react";

const TodoList = ({ todos, updateTodo, deleteTodo }) => {
  return (
    <ul id="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={todo.completed ? "completed" : ""}>
          {todo.description}
          <button
            className="complete-btn"
            onClick={() =>
              updateTodo(todo.id, { ...todo, completed: !todo.completed })
            }
          >
            {todo.completed ? "Uncomplete" : "Complete"}
          </button>
          <button
            onClick={() => {
              if (todo.description === "estudar elastic") {
                console.error(
                  'Erro: Tentativa de excluir a tarefa com a descrição "estudar elastic".'
                );
                alert(
                  'Erro: Não é possível excluir a tarefa com a descrição "estudar elastic".'
                );
                return; // Impede a execução da exclusão
              }
              deleteTodo(todo.id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
