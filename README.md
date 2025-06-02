📚 FutManager

🧾 Descrição
O usuário poderá cadastrar diferentes times de futebol e gerencia-los.

Esta API simula o cadastro de times. Permitindo que o usuário crie, edite e exclua-os. 

👥 Integrantes da Dupla
Guilherme Cerqueira Sanchez - GuiSanchez1910
Nicolas Perandré Rapp - nicolasrapp05

🛠️ Tecnologias Utilizadas
Linguagem: C# (.NET 9)
Framework: ASP.NET Core
ORM: Entity Framework Core
Banco de Dados: MySQL
Front-end: JavaScript, Jquery
Versionamento: GitHub

🚀 Como Executar o Projeto
Pré-requisitos
.NET SDK 9.0+
MySQL instalado

Passos
# 1. Clone o repositório
https://github.com/GuiSanchez1910/FutManager.git

# 2. No arquivo "appsettings.json", mude a senha do banco de dados, para sua senha local

# 3. Acesse a pasta do projeto backend
cd .\FutManager\futmanagerAPI\

# 4. Restaure os pacotes
dotnet restore

# 5. Aplique as migrações
dotnet ef database update

# 6. Execute a API
dotnet run

# 7. Abra um segundo terminal
Terminal > New Terminal

# 8. Acesse a pasta do projeto frontend
cd .\FutManager\fut-manager

# 9. Instale as dependências
npm install

# 10. Inicie o servidor de desenvolvimento
npm run dev
