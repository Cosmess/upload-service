# Clean Architecture With NestJS
## Description
Micro Services base with Nestjs
## Getting Started
### Dependencies
* JWT - você precisa fornecer uma chave secreta e um emissor válido.
* Sequelize - você precisa fornecer uma string de conexão válida.
 
Adicione as seguintes variáveis de ambiente:

# Server
NODE_ENV=

LOG_LEVEL=
PORT=
HOST=
SSL=
 
# JWT
JWT_SECRET=
JWT_ISSUER=
JWT_EXPIRE=
 
# Database
SEQ_SQLDB_DATABASE=
SEQ_SQLDB_HOST=
SEQ_SQLDB_PASSWORD=
SEQ_SQLDB_PORT=
SEQ_SQLDB_USER=
 

### Installing

npm install

### Executing program - Production

npm run start:prod

### Executing program - Development

npm start:dev