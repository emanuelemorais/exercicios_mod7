# Ponderada 2 - módulo 7
## Aluno: Emanuele Lacerda Morais Martins

Para a realização dessa atividade foi necessário cria uma aplicação web que funciona como um "bloco de notas" para o usuário, que possui as funcionalidades de autenticação, registrar e consultar itens em um banco de dados. Além disso, a aplicação foi containerizada usando tecnologias como Docker e Docker Compose.


## Arquitetura da solução utilizada 
Para a execução da atividade, foi utilizada a seguinte arquitetura:

![image](https://github.com/emanuelemorais/exercicios_mod7/assets/99221221/1b84f05c-2a6f-448f-a999-cfca84c037e3)

A aplicação é constituída por um total de três containers, dos quais dois são personalizados e um é oficial. Esses containers são gerenciados por meio de um arquivo Docker Compose.

- Container **postgres**: Esse container utiliza a imagem oficial do Postgres e suas configurações de ambiente são definidas no Docker Compose.
- Container **backend**: Para a criação desse container foi feito um DockerFile próprio que se baseia na imagem no container oficial mais recente do Node.js disponível no Docker Hub. 
- Container **frontend**



## Descrição da estrutura de dados utilizada

## Estrutura de pastas
-> descrever o que está em cada pasta 

## Instruções para utilizar a aplicação (cadastro -> login -> ver notas -> nova nota -> todas as notas )

## Como executar a aplicação



