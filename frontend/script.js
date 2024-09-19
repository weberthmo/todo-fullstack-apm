const apiUrl = "http://localhost:4000/todos";

document.getElementById("todo-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const description = document.getElementById("description").value;

  if (description.trim()) {
    await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description, completed: false }),
    });
    loadTodos();
    document.getElementById("description").value = "";
  }
});

async function loadTodos() {
  const response = await fetch(apiUrl);
  const todos = await response.json();

  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.textContent = todo.description;
    li.classList.toggle("completed", todo.completed);

    // Botão para concluir tarefa
    const completeButton = document.createElement("button");
    completeButton.textContent = todo.completed ? "Uncomplete" : "Complete";
    completeButton.addEventListener("click", async () => {
      await fetch(`${apiUrl}/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: todo.description,
          completed: !todo.completed,
        }),
      });
      loadTodos();
    });

    // Botão para deletar tarefa
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", async () => {
      if (todo.description === "estudar elastic") {
        console.error(
          'Erro: Tentativa de excluir a tarefa com a descrição "estudar elastic".'
        );
        alert(
          'Erro: Não é possível excluir a tarefa com a descrição "estudar elastic".'
        );
        return; // Impede a execução da exclusão
      }
      await fetch(`${apiUrl}/${todo.id}`, { method: "DELETE" });
      loadTodos();
    });

    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
}

loadTodos();
