# 📝 SimplesNote
SimplesNote é uma aplicação web simples para gerenciar notas com autenticação de usuários, desenvolvida com Node.js, Express e MySQL. O projeto oferece funcionalidades básicas como registro, login, criação, edição e remoção de notas.

## 🚀 Funcionalidades
* ✅ Registro e login de usuários com autenticação via JWT

* ✅ Criação de notas associadas ao usuário autenticado

* ✅ Edição de notas existentes

* ✅ Remoção de notas

* ✅ Armazenamento dos dados em MySQL

* ✅ Organização simples de rotas e estrutura de pastas

## Tecnologias

* Node.js

* Express

* MySQL

* JWT

* dotenv

* cookie-parser

## 🔒 Segurança
* As senhas dos usuários são codificadas com base64 (⚠️ não recomendado para produção, use bcrypt ou argon2).

* O token JWT é salvo em cookies e verificado em rotas protegidas.

* Variáveis sensíveis estão armazenadas no arquivo .env.

## 📦 Instalação

1. Clone o repositório:

`````
git clone https://github.com/RafaelHenriqu/SimplesNote.git

`````

2. Instale as dependências:
````
npm install
````

3. Configure o arquivo .env com suas credenciais MySQL:

````
host=localhost
user=seu_usuario
password=sua_senha
database=seu_banco
port=3306
Secret=sua_chave_jwt
````
4. Crie o banco de dados com duas tabelas:

````
CREATE TABLE users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    Password VARCHAR(255),
    Email VARCHAR(255)
);

CREATE TABLE notes (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Title TEXT,
    Desc_SQL TEXT,
    UserID INT
);
````
5. Inicie o servidor:
````
node server.js
````
Acesse em http://localhost:5000.



## 🎯 Objetivo
Este projeto foi desenvolvido como parte de uma jornada de aprendizado em backend e serve como um marco de evolução técnica, integrando front-end e back-end de maneira prática.

📌 Observações
* O projeto pode conter falhas pontuais, pois foi feito como exercício de aprendizado.

