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

#### Motivo para escolha dessa arquitetura

A escolha dessa arquitetura, com separação entre backend e frontend com container próprios, foi feita para que seja possível utilizar frameworks robustos em sua construção. O Postgres foi utilizado por ser um banco de dados relacional fácil de usar em ambiente containerzado, o framework Express juntamente com a ORM Prisma foram escolhidos para o backend com o objetivo de criar um desafio adicional na atividade ( não possuia experiência com essas ferramentas ) e, por fim, o NextJS foi utilizado no frontend pois possui certa facilidade na criação de rotas. 

## Descrição da estrutura de dados utilizada

O banco de dados é relacionado da seguinte forma:

![image](https://github.com/emanuelemorais/exercicios_mod7/assets/99221221/5c16cf5f-a327-491c-98ac-910f9e01d921)

- **User**: Armazena os usuários cadastrados. Possui a coluna `email` para armazenar email, `user` para armazenar o nome de usuário e `hashedPassword` para armazenar a senha em formato hash.
- **Post**: Armazena as postagens feitas na plataforma. Possui a coluna `authorId` para armazenar o autor do post, `title` para armazenar o titulo das postagem, `content` para armazezar o conteúdo da postagem, `createdAt` e `updatedAt` para guarda momento de criação e edição. 

> **Disclaimer:** Ao acessar  "backend/prisma/schema.prisma" é possível ver no Schema uma tabela chamada "Profile" que foi criada no intuito de armazenar depois informações sobre o usuário. Devido ao tempo essa tabela não foi utilizada mas mantém-se para aprimorações futuras.


## Estrutura de pastas

```
|-- backend
|   |-- bin
|   |-- controllers
|   |-- database
|   |-- middlewares
|   |-- prisma
|   |-- routes
|-- frontend
|   |-- .next
|   |-- app
|   |-- context
|   |-- public
```

- Backend 
  - bin: Arquivo responsável por iniciar o servidor web
  - controllers: Controladores que preparam o input do usuário para manipulação direta do banco de dados
  - middlewares: Middlewares de autenticação
  - prisma: Definições dos modelo para o banco de dados
  - routes: Definições das rotas da aplicação.
Na pasta raiz (backend) também existem arquivos importantes como app.js, Dockefile e package.json. O app.js é o arquivo resposável por consolidar o backend, o Dockerfile é utilizado posteriormente no docker-compose para criar o container do backend e o package.json indicação dependências e scripts essenciais para a aplicação.

- Frontend
  - .next: Itens necessários para execução do Next.js.
  - app: Páginas da aplicação
  - components: Componentes utilizados (não componentizei a aplicação)
  - context: Gerenciamento do estado global da aplicação utilizado na autenticação
  - public: Ativos estáticos públicos (imagens, ícones).
Na pasta raiz (frontend) possui alguns arquivos importantes como Dockerfile e package.json. O Dockerfile é utilizado posteriormente no docker-compose, o package.json indica as dependências e scripts essenciais para a aplicação.

## Como executar a aplicação

Para execução, siga os seguintes passos:
- Clone este repositorio em sua máquina
- Entre no diretorio `exercicios_mod7/ponderada2`
- Execute o comando `docker-compose up`.
- Ao terminar o carregamento abra um navegador e acesse `http://localhost:3000`.

## Instruções para acessar a aplicação (cadastro -> login -> ver notas -> nova nota -> todas as notas )

- A pagina inicial ao acessar `http://localhost:3000` é a página de login:

![image](https://github.com/emanuelemorais/exercicios_mod7/assets/99221221/122fb578-3183-47b3-baf0-6fd88b6c0f97)

Na primeira execução da aplicaçõa ainda não existe nenhum conta registrada, sendo assim, é possível criar um login acessando "Criar nova conta" disponivel na pagina inicial.

- Página de cadastro:

![image](https://github.com/emanuelemorais/exercicios_mod7/assets/99221221/f29d5e6f-9360-4c8c-a619-9588c7ef92f0)

Essa pagina pode ser acessada na rota `http://localhost:3000/new_user` e nela é criado o login de acesso. Ao criar um conta é feito o redirecionamento para a página de login e agora, ao tentar fazer login, será possível com as credenciais criadas anteriormente.
> **Disclaimer:** Ao tentar criar uma credencial com um user já existente no banco de dados dará erro pois o user é único

- Página de consultar notas feitas:

![image](https://github.com/emanuelemorais/exercicios_mod7/assets/99221221/f7748e5f-2dd8-4571-8625-947a18c17b22)

Essa pagina pode ser acessada na rota `http://localhost:3000/all_posts` mas só pode ser acessada com o token de autenticação criado no processo de login. Ao acessar essa página pela primeira vez ela estará vazia ( pois não tem nenhuma nota salva ).  Ao clicar no "+" no topo da tela é possível criar nova nota.

- Página de criar nova nota:

![image](https://github.com/emanuelemorais/exercicios_mod7/assets/99221221/6a7807f2-c0e3-4fff-9f19-d490cd8c0f0c)

Essa pagina pode ser acessada na rota `http://localhost:3000/new_post` mas só pode ser acessada com o token de autenticação criado no processo de login. Ao adicionar titulo e conteudo e clicar em salvar é possível ver a nova nota na página de consulta das notas feitas (é feito um redirecionamento automatico).



