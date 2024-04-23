# Use uma imagem base do Node.js 18
FROM node:18-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo .env para o contêiner
COPY .env /app/.env

# Copie os arquivos necessários para o contêiner
COPY package.json package-lock.json /app/

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos para o contêiner
COPY . /app

# Expõe a porta do aplicativo
EXPOSE 3000

# Inicia o aplicativo
CMD ["npm", "run", "start:prod"]

