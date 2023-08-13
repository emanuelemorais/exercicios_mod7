# Ponderada 1 - módulo 7
### Aluno: Emanuele Lacerda Morais Martins

Para a execução dessa atividade foi necessário criar um backend em flask para servir uma página HTML que contém um currículo dockerizado. Para isso foi criado um Dockerfile que executa os seguintes passos: 

- Defini a imagem base como Python versão 3.11:
````
FROM python:3.11
````
- Cria o diretório /app no container:
````
WORKDIR /app `` : 
````
- Copia os requirements e os instala no container as bibliotecas necessárias:
````
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
````
- Copia o path src para o container:
````
COPY /src .
````
-  Defini variável de ambiente chamada PATH dentro do ambiente do conteiner para indicar qual diretório deve executar o comando
````
ENV PATH="/src:$PATH"
````
- Expões porta 80:
````
EXPOSE 80
````
- Roda o comando de iniciar o servidor flask:
````
CMD ["flask", "run", "--host=0.0.0.0", "--port=80"]
````

## Executando a aplicação

- Entre no diretório `exercicios_mod7/ponderada1` 
- Rode no terminar o comando `docker build -t curriculo:0.1 .` para construir o container
- Após execução do comando acima, rode em seguida `docker run -p 80:80 curriculo:0.1`
- Para entrar na aplicação dockerizada entre no navegador e acesse `http://127.0.0.1:80`

## Imagem no DockerHub

A imagem pode ser encontrada em https://hub.docker.com/r/manumorais1231/curriculo

