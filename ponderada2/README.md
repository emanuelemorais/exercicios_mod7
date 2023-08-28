# Ponderada 2 - módulo 7
## Aluno: Emanuele Lacerda Morais Martins

Para a realização dessa atividade foi necessário cria uma aplicação web que funciona como um "bloco de notas" para o usuário, que possui as funcionalidades de autenticação, registrar e consultar itens em um banco de dados. Além disso, a aplicação foi containerizada usando tecnologias como Docker e Docker Compose.


## Arquitetura da solução utilizada 
Para a execução da atividade, foi utilizada a seguinte arquitetura:

![image](https://github.com/emanuelemorais/exercicios_mod7/assets/99221221/1b84f05c-2a6f-448f-a999-cfca84c037e3)

A aplicação é constituída por um total de três containers, dos quais dois são personalizados e um é oficial. Esses containers são gerenciados por meio de um arquivo Docker Compose.

- Container **postgres**: Esse container utiliza a imagem oficial do Postgres e suas configurações de ambiente são definidas no Docker Compose.
  
- Container **backend**: Para a criação desse container foi feito um DockerFile próprio que se baseia na imagem no container oficial mais recente do Node.js disponível no Docker Hub. O DockerFile cria o diretório /backend no container, copia os arquivos necessários para dentro do container, instala as dependências do projeto, copia todos os outros arquivos do projeto para dentro do container e por fim inicia a aplicação dentro do container. Esse container pode ser encontrado em https://hub.docker.com/repository/docker/manumorais1231/ponderada2-backend/general
   
- Container **frontend**: Para a criação desse container foi feito um DockerFile próprio que também se baseia na imagem no container oficial mais recente do Node.js disponível no Docker Hub. O DockerFile cria o diretório /frontend no container, copia os arquivos necessários para dentro do container, instala as dependências do projeto, expõe porta 3000, copia todos os outros arquivos do projeto para dentro do container e inicia a aplicação dentro do container. Esse container pode ser encontrado em https://hub.docker.com/repository/docker/manumorais1231/ponderada2-frontend/general

- **Docker Compose**: O docker compose é usado para definir e executar vários serviços em um ambiente Docker. No  `docker-compose.yml` está definindo o serviço chamado "db" que utiliza uma imagem do Postgres. O serviço está configurado com variáveis de ambiente para configurar o banco de dados, como senha, usuário e nome do banco de dados. Está definido a utilização das portas 5432 (dentro do contêiner) e 5432 (fora do contêiner) para permitir a conexão com o banco de dados. Também é definido o serviço "backend" que é construído usando o Dockerfile no diretório ./backend. É definida a porta 3001 para permitir o acesso ao serviço. Além disso, esse serviço depende do serviço "db" (Postgres). Por último, o serviço "frontend" é construído usando o Dockerfile no diretório ./frontend. Este utiliza a porta 3000 (fora do contêiner) e depende do serviço "backend".

### Motivo para escolha dessa arquitetura

A escolha dessa arquitetura, com separação entre backend e frontend com container próprios, foi feita para que seja possível utilizar frameworks robustos em sua construção. O Postgres foi utilizado por ser um banco de dados relacional fácil de usar em ambiente containerzado, o framework Express juntamente com a ORM Prisma foram escolhidos para o backend com o objetivo de criar um desafio adicional na atividade ( não possuia experiência com essas ferramentas ) e, por fim, o NextJS foi utilizado no frontend pois possui certa facilidade na criação de rotas. 

## Descrição da estrutura de dados utilizada

## Estrutura de pastas
-> descrever o que está em cada pasta 

## Instruções para utilizar a aplicação (cadastro -> login -> ver notas -> nova nota -> todas as notas )

## Como executar a aplicação



