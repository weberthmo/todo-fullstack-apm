# Aplicação Todo Fullstack

Este é um projeto de exemplo para uma aplicação "Todo" fullstack, contendo frontend em HTML, CSS e JavaScript, e backend em Node.js com banco de dados SQLite.

## Dependências

### Backend

- **Node.js**: Versão 20 ou superior
- **express**: Framework para Node.js
- **cors**: Middleware para habilitar CORS
- **body-parser**: Middleware para parsing do corpo das requisições
- **sqlite3**: Driver para SQLite

### Frontend

- Nenhuma dependência externa

## Instalação

### Backend

1. Navegue até o diretório `backend`:

```bash
 cd backend
```

2. Instale as dependências do backend:

```bash
npm install express cors body-parser sqlite3
```

### Frontend

O frontend não possui dependências externas e pode ser usado diretamente com os arquivos fornecidos.

## Comandos CLI

### Backend - Iniciar o servidor:

```bash
node server.js
```

O servidor estará disponível em http://localhost:4000.

### Inicializar o Frontend

Navegue até o diretório frontend.

```bash
cd frontend
```

- Abra o arquivo index.html em um navegador web.
- O frontend se conectará ao backend em http://localhost:4000.

## Caminhos dos Arquivos

### Backend

- backend/server.js: Código do servidor Node.js.
- backend/todos.db: Banco de dados SQLite contendo as tarefas.

### Frontend

- frontend/index.html: Página HTML do frontend.
- frontend/script.js: Script JavaScript para manipulação das tarefas.
- frontend/style.css: Estilos CSS para a interface.

## Exemplo de Requisições da API

### Criar uma Nova Tarefa

- URL: http://localhost:4000/todos
- Método: POST
- Corpo da Requisição:

```
{
"description": "Nova tarefa",
"completed": false
}
```

### Obter Todas as Tarefas

- URL: http://localhost:4000/todos
- Método: GET

### Atualizar uma Tarefa

- URL: http://localhost:4000/todos/:id
- Método: PUT
- Corpo da Requisição:

```
{
"description": "Descrição atualizada",
"completed": true
}
```

### Excluir uma Tarefa

- URL: http://localhost:4000/todos/:id
- Método: DELETE

## Observações

- Certifique-se de que o servidor backend esteja em execução antes de acessar o frontend.
- Para depuração e análise, você pode usar ferramentas como Postman para testar as rotas da API.
