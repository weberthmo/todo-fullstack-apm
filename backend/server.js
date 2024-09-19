const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const apm = require("elastic-apm-node").start({
  serviceName: "my-todo-backend",
  secretToken: "N2XMgf2AlPvF2l0h95",
  serverUrl:
    "https://c8c80b2ac82247418f85f7eba9bb0320.apm.eastus2.azure.elastic-cloud.com",
  environment: "my-environment",
  logLevel: "error",
});

const app = express();
const db = new sqlite3.Database("./todos.db");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Criar tabela de todos
db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT,
    completed BOOLEAN
)`);

// Rota para obter todas as tarefas
app.get("/todos", (req, res) => {
  const transaction = apm.startTransaction("GET /todos");
  const span = apm.startSpan("Database Query");

  db.all("SELECT * FROM todos", [], (error, rows) => {
    if (error) {
      apm.captureError(error);
      res.status(500).json({ error: error.message });
      span.end(); // Finaliza o span
      transaction.end(); // Finaliza a transação
      return;
    }

    res.json(rows);
    span.end(); // Finaliza o span
    transaction.end(); // Finaliza a transação
  });
});

// Rota para simular um erro
app.get("/error", (req, res) => {
  const transaction = apm.startTransaction("GET /error");
  const error = new Error("Erro simulado para testes.");
  apm.captureError(error);
  res.status(500).json({ error: error.message });
  transaction.end(); // Finaliza a transação
});

// Rota para simular erro de lógica
app.get("/error-logic", (req, res) => {
  const transaction = apm.startTransaction("GET /error-logic");
  try {
    const result = someNonExistentFunction(); // Simula erro de lógica
    res.send(result);
  } catch (error) {
    apm.captureError(error);
    console.error("Erro de lógica:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
  transaction.end(); // Finaliza a transação
});

// Rota para criar uma nova tarefa
app.post("/todos", (req, res) => {
  const transaction = apm.startTransaction("POST /todos");
  const { description, completed } = req.body;

  // Verifica se a descrição é "estudar datadog" e retorna erro
  if (description === "estudar datadog") {
    const error = new Error('A descrição "estudar datadog" não é permitida.');
    apm.captureError(error);
    return res.status(400).json({ error: error.message });
  }

  db.run(
    `INSERT INTO todos (description, completed) VALUES (?, ?)`,
    [description, completed],
    function (error) {
      if (error) {
        apm.captureError(error);
        res.status(400).json({ error: error.message });
        transaction.end(); // Finaliza a transação
        return;
      }

      res.json({ id: this.lastID });
      transaction.end(); // Finaliza a transação
    }
  );
});

// Rota para atualizar uma tarefa
app.put("/todos/:id", (req, res) => {
  const transaction = apm.startTransaction("PUT /todos/:id");
  const { description, completed } = req.body;
  db.run(
    `UPDATE todos SET description = ?, completed = ? WHERE id = ?`,
    [description, completed, req.params.id],
    function (error) {
      if (error) {
        apm.captureError(error);
        res.status(400).json({ error: error.message });
        transaction.end(); // Finaliza a transação
        return;
      }

      res.json({ updated: this.changes });
      transaction.end(); // Finaliza a transação
    }
  );
});

// Rota para deletar uma tarefa
app.delete("/todos/:id", (req, res) => {
  const transaction = apm.startTransaction("DELETE /todos/:id");
  db.run(`DELETE FROM todos WHERE id = ?`, req.params.id, function (error) {
    if (error) {
      apm.captureError(error);
      res.status(400).json({ error: error.message });
      transaction.end(); // Finaliza a transação
      return;
    }
    res.json({ deleted: this.changes });
    transaction.end(); // Finaliza a transação
  });
});

// Servidor rodando na porta 4000
app.listen(4000, () => {
  console.log("Server running on port 4000");
});
