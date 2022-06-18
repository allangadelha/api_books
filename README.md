# API de livros

API criada para gereciamento de livros, com autenticação e autorização JWT com seus devidos testes em Jest.

## 🚀 Começando

Para ver o projeto basta clonar or epositório em seu máquina.

### 📋 Pré-requisitos

```
Conexão com PostgreSQL (usei a versão 10);

Node.js (usei a versão 16.14.0);

Docker e Docker Compose (caso queira executar utilizando o Docker);

Bibliotecas:

    axios(versão 0.21.1);    
    bcrypt(versão 5.0.1);    
    bodyparse(versão  1.19.0);    
    express( versão 4.17.1);    
    jest(versão 26.6.3);    
    jsonwebtoken(versão 8.5.1);    
    nodemon(versão 2.0.16);
    pg-promise: (versão 10.9.1).
```

### 🔧 Instalação


Clonar repositório:

```
git clone https://github.com/allangadelha/api_books.git
```

Instalar dependências:

```
npm install
```

🚀 Como executar:


A partir do ambiente local:

```
npm run dev
```

A partir do Docker:

```
docker-composer up -d
```

## ⚙️ Executando os testes

Para rodar os testes execuite o seguinte comando:

```
npm test
```

### 🔩 Analise os testes de ponta a ponta

Foram criados testes para:

#### listar todos os livros;

#### retornar um livro por ID;

#### editar um livro por ID;

#### remover um livro por ID;

## 📦 Desenvolvimento

Foram criad as seguintes rotas da API:

```  
get('/login') // gerar token JWT para acessar as demais rotas (todas as rotas a seguir só poderão ser acessadas informando o token gerado);

get('/books') // listar todos os livros;

get('/books/:id') // retornar um livro;

post('/books') // adicionar um livro;

put('/books/:id') // editar um livro;

patch('/books/:id') // alterar se um livro é aludago ou não;

delete('/books/:id') // remover um livro;
```


## 🖇️ Desenvolvido por:

Allan Gadelha Xavier
