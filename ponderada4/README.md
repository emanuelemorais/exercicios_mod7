# Ponderada 4 - módulo 7
## Aluno: Emanuele Lacerda Morais Martins

O objetivo dessa atividade é construir uma dashboard de visualização de dados e realizar predições com o modelo criado na ponderada.


## Video do funcionamento
https://drive.google.com/file/d/1U2HzUMDlZ0xe3712IS4Lh-2O3BKJccMQ/view?usp=sharing

## Publicação das Imagens para os sistemas
Para a construção dessa atividade foi utilizado Docker, EC2 e RDS. O primeiro passo foi a criação do banco de dados no RDS. Após isso os códigos de backend e frontend foram feitos localmente e testados em conjunto com o banco no RDS. O próximo passo foi containezar a aplicação usando Docker. Por fim, em uma máquina EC2 foi feito um clone nas imagens docker publicadas no dockerhub e, em seguida executadas.   

### Máquina EC2
![image](https://github.com/emanuelemorais/exercicios_mod7/assets/99221221/cacc182b-dbfb-49b9-89b7-6e1b65007d6d)

### Banco RDS
![image](https://github.com/emanuelemorais/exercicios_mod7/assets/99221221/662c2672-71c8-452a-9029-1469b3f3bcee)

### Imagens DockerHub
- Front: https://hub.docker.com/repository/docker/manumorais1231/front-ponderada4/general
- Back: https://hub.docker.com/repository/docker/manumorais1231/back-ponderada4/general


## Passos para execução
Pré requisito: Ter docker instalado e configurado no computador

Rode em um terminar os seguinter comandos:
- 1°: `docker pull manumorais1231/back-ponderada4`
- 2°: `docker run -d  -p 8000:8000 manumorais1231/back-ponderada4`
- 3°: `docker pull manumorais1231/front-ponderada4`
- 4°: `docker run -d  -p 3000:3000 manumorais1231/front-ponderada4`

Agora, no navegador abra em `http://localhost:3000/` e tente o usuário email = teste e password = teste.

##  Construção do Dashboard
A dashboard da aplicação foi feita usando Next JS. A construção dos gráficos foi com a biblioteca ChartJS. Para sua cosntrução são consultados dados das predições previamente feitas e registradas pela plataforma.

![image](https://github.com/emanuelemorais/exercicios_mod7/assets/99221221/d2659034-325c-45dc-8d90-9152eecfa6ee)
