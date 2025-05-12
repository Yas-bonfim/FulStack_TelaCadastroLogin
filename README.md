# 📚 Sistema de Gerenciamento de Livros - Backend (Node.js + Express + MongoDB) + Frontend (React)

Este projeto é uma aplicação web completa que permite a gestão de uma lista de livros com autenticação JWT. Ele é composto por:

- Uma **API RESTful** desenvolvida em Node.js, Express e MongoDB;
- Uma **interface web (frontend)** desenvolvida com React;
- Integração entre frontend e backend usando token JWT e requisições HTTP protegidas.

📺 **Link do vídeo:** _[adicione aqui o link da sua apresentação/demo]_

---

## 🚀 Funcionalidades

### 🔐 Autenticação (Backend)

- Cadastro de usuário (`POST /register`)
- Login com geração de token JWT (`POST /login`)

### 📚 CRUD de Livros (Backend - protegido por JWT)

- Criar novo livro (`POST /books`)
- Listar livros do usuário autenticado (`GET /books`)
- Ver detalhes de um livro (`GET /books/:id`)
- Atualizar todos os campos de um livro (`PUT /books/:id`)
- Atualizar parcialmente (`PATCH /books/:id`)
- Deletar livro (`DELETE /books/:id`)

### 💻 Interface Web (Frontend em React)

- Tela de cadastro com feedback visual
- Tela de login com armazenamento do token JWT e redirecionamento
- Área logada protegida (dashboard)
  - Listagem de livros do usuário
  - Requisições autenticadas para o backend (com JWT)
  - Botão de logout
- Feedback visual para erros e sucesso (usando [react-toastify](https://fkhadra.github.io/react-toastify))
- Indicação de carregamento durante requisições
- Responsividade básica para dispositivos móveis

---

## 🧱 Estrutura do Projeto

### Backend (`/api`)


### Frontend (`/frontend`)

frontend/
├── src/
│ ├── components/ # Componentes reutilizáveis (ex: formulário de livros)
│ ├── pages/ # Páginas da aplicação (Login, Cadastro, Dashboard)
│ ├── auth.js # Funções auxiliares de autenticação
│ ├── App.jsx # Rotas e navegação
│ └── main.jsx # Ponto de entrada
└── public/



---

## ⚙️ Instalação e Execução

### 🔧 Backend

#### Pré-requisitos
- Node.js >= 14
- MongoDB local ou MongoDB Atlas

#### Passos

```bash
# 1. Clonar o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

# 2. Instalar as dependências
npm install

# 3. Criar o arquivo de variáveis de ambiente
touch .env

# .env (exemplo)
PORT=3000
MONGODB_URI=mongodb://localhost:27017/livros
JWT_SECRET=sua_chave_secreta

# 4. Iniciar o servidor
npm start


# 1. Acesse a pasta frontend
cd frontend

# 2. Instale as dependências
npm install

# 3. Execute o servidor de desenvolvimento
npm run dev

