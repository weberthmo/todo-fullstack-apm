const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors"); // Importar o CORS

const app = express();
const db = new sqlite3.Database("./todos.db");

app.use(cors()); // Habilitar CORS
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
  db.all("SELECT * FROM todos", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Rota para criar uma nova tarefa
app.post("/todos", (req, res) => {
  const { description, completed } = req.body;

  // Verifica se a descrição é "xxx" e retorna erro
  if (description === "estudar datadog") {
    return res
      .status(400)
      .json({ error: 'A descrição "xxx" não é permitida.' });
  }

  db.run(
    `INSERT INTO todos (description, completed) VALUES (?, ?)`,
    [description, completed],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

// Rota para atualizar uma tarefa
app.put("/todos/:id", (req, res) => {
  const { description, completed } = req.body;
  db.run(
    `UPDATE todos SET description = ?, completed = ? WHERE id = ?`,
    [description, completed, req.params.id],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ updated: this.changes });
    }
  );
});

// Rota para deletar uma tarefa
app.delete("/todos/:id", (req, res) => {
  db.run(`DELETE FROM todos WHERE id = ?`, req.params.id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ deleted: this.changes });
  });
});

// Servidor rodando na porta 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
