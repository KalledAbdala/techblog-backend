# 🚀 TechBlog API

Backend de uma plataforma de blog desenvolvido em **Node.js**, **TypeScript**, **Express** e **Prisma ORM**, utilizando **MySQL** como banco de dados.

O projeto oferece autenticação via JWT, gerenciamento de usuários, categorias, artigos, comentários, curtidas, tags e upload de imagens, seguindo uma arquitetura em camadas e boas práticas de desenvolvimento.

---

# 📚 Índice

- Sobre
- Funcionalidades
- Tecnologias
- Arquitetura
- Estrutura do Projeto
- Instalação
- Variáveis de Ambiente
- Executando o Projeto
- Rotas da API
- Autenticação
- Upload de Arquivos
- Melhorias Futuras
- Autor

---

# 📖 Sobre

A TechBlog API foi desenvolvida como projeto de estudo e avaliação técnica.

Seu objetivo é disponibilizar uma API REST completa para gerenciamento de um blog, permitindo:

- autenticação de usuários;
- gerenciamento de categorias;
- publicação de artigos;
- upload de banners;
- sistema de comentários;
- sistema de curtidas;
- gerenciamento de tags;
- filtros e paginação.

---

# ✨ Funcionalidades

## Usuários

- Cadastro
- Login
- JWT
- Perfil autenticado

---

## Categorias

- Criar categoria
- Listar categorias
- Buscar categoria por ID

---

## Artigos

- Criar artigo
- Editar artigo
- Excluir artigo
- Publicar artigo
- Upload de banner
- Contagem de visualizações
- Paginação
- Busca por título
- Busca por categoria
- Busca por tag

---

## Tags

- Criar tag
- Listar tags
- Vincular tag ao artigo
- Remover tag do artigo

---

## Comentários

- Criar comentário
- Listar comentários
- Remover comentário

---

## Curtidas

- Curtir artigo
- Remover curtida
- Contagem de curtidas
- Bloqueio de curtidas duplicadas

---

# 🛠 Tecnologias

- Node.js
- TypeScript
- Express
- Prisma ORM
- MySQL
- JWT
- Bcrypt
- Zod
- Multer

---

# 🏗 Arquitetura

O projeto segue uma arquitetura em camadas.

```
Controller
      │
      ▼
Service
      │
      ▼
Prisma ORM
      │
      ▼
MySQL
```

Cada camada possui uma responsabilidade específica:

- Controllers → recebem as requisições HTTP
- Services → regras de negócio
- Schemas → validação utilizando Zod
- Middlewares → autenticação e autorização
- Prisma → acesso ao banco de dados

---

# 📁 Estrutura do Projeto

```
backend
│
├── prisma/
│
├── uploads/
│
├── src/
│   │
│   ├── @types/
│   ├── config/
│   ├── controllers/
│   ├── errors/
│   ├── lib/
│   ├── middlewares/
│   ├── repositories/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── types/
│   ├── utils/
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

# ⚙ Instalação

Clone o projeto

```bash
git clone https://github.com/SEU-USUARIO/techblog-api.git
```

Entre na pasta

```bash
cd backend
```

Instale as dependências

```bash
npm install
```

---

# 🔑 Variáveis de Ambiente

Crie um arquivo `.env`

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/techblog"

JWT_SECRET="seu_token_super_secreto"
```

---

# 🗄 Banco de Dados

Execute as migrations

```bash
npx prisma migrate dev
```

Gere o Prisma Client

```bash
npx prisma generate
```

---

# ▶ Executando o Projeto

Modo desenvolvimento

```bash
npm run dev
```

Build

```bash
npm run build
```

Produção

```bash
npm start
```

Servidor disponível em

```
http://localhost:3000
```

---

# 🔐 Autenticação

As rotas protegidas utilizam JWT.

Enviar no Header:

```
Authorization: Bearer SEU_TOKEN
```

---

# 📌 Principais Rotas

## Auth

```
POST   /auth/register
POST   /auth/login
GET    /auth/me
```

---

## Categorias

```
GET    /categories
GET    /categories/:id
POST   /categories
```

---

## Artigos

```
GET    /articles
GET    /articles/:slug

POST   /articles
PUT    /articles/:id
DELETE /articles/:id

POST   /articles/:id/banner
```

Filtros disponíveis:

```
GET /articles?search=node

GET /articles?category=tecnologia

GET /articles?tag=nodejs

GET /articles?page=2&limit=10
```

---

## Tags

```
GET    /tags
POST   /tags

POST   /articles/:id/tags
GET    /articles/:id/tags
DELETE /articles/:id/tags/:tagId
```

---

## Comentários

```
POST   /articles/:id/comments
GET    /articles/:id/comments

DELETE /comments/:id
```

---

## Curtidas

```
POST   /articles/:id/like

DELETE /articles/:id/like

GET    /articles/:id/likes
```

---

# 📤 Upload de Banner

O upload é realizado utilizando **multipart/form-data**.

Campo esperado:

```
banner
```

As imagens são armazenadas na pasta:

```
uploads/
```

---


# 👨‍💻 Autor

Desenvolvido por **Kalled Abdala**.

Projeto criado para fins de estudo, portfólio e avaliação técnica.