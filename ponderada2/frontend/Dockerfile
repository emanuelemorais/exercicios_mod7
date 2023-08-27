FROM node:latest

WORKDIR /frontend

# Copiando os arquivos necessários para dentro do container
COPY package.json ./
COPY package-lock.json ./

# Instalando as dependências do projeto
RUN npm install

EXPOSE 3000

# Copiando todos os outros arquivos do projeto para dentro do container
COPY . ./

# Comando para iniciar a aplicação dentro do container
CMD ["npm", "run", "dev"]
