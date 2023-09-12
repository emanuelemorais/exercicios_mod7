# Ponderada 3 - módulo 7
## Aluno: Emanuele Lacerda Morais Martins

Para a execução dessa atividade foi necessário criar um modelo de inteligência artificial pré treinado, criar uma api para acessar enviar e receber outputs do modelo e dockerizar o processo.

## Criação da IA

### Tratamento de dados
Para criação da inteligência articifial foi usado o dataset [Brazil Total highway crashes 2010-2023](https://www.kaggle.com/datasets/liamarguedas/brazil-total-highway-crashes-2010-2023) e o objetivo do modelo foi prever a gravidade de um acidente de acordo com os inputs enviados. A pipeline de tratamento dos dados é representada pela imagem abaixo:

![ponderada3](https://github.com/emanuelemorais/exercicios_mod7/assets/99221221/baaa1d76-89e0-4ce2-9ad0-83ea5a485f4b)

#### Criação da coluna gravidade

Essa coluna foi criada a partir da partir das colunas já existentes "levemente_feridos", "moderadamente_feridos", "gravemente_feridos" e "mortos". A cada grau de gravidade da situação foi atribuido pesos, da seguinte forma:

![image](https://github.com/emanuelemorais/exercicios_mod7/assets/99221221/812eb044-1914-40e5-89c8-16703301fcde)

#### Remoção de colunas não utilizadas

Após a criação dessa coluna são removidas algumas colunas do dataframe que não foram utilizadas no modelo.

#### Arruma tipografia dos valores

Como o dataframe tinha muitos valores que representavam a mesma coisa mas que foram escritos de forma diferente, como por exemplo "sem vítima" e "Sem vítima", foi feito um processo de padronização dos valores existentes. Isso foi feito nas colunas "tipo_de_ocorrencia", "tipo_de_acidente" e "sentido".

#### Passa dados qualitativos para quantitativos

Após a padronização dos valores das colunas é feito o processo de transformar os valores qualitativos para quantitativos. Isso foi feito com o objetivos de ótimizar o processamento do modelo. A codificação ficoou da seguinte forma:

- Coluna "gravidade"
  
![image](https://github.com/emanuelemorais/exercicios_mod7/assets/99221221/d0eefa45-2500-4837-b884-53afdb134fb0)

- Coluna "tipo de acidente"
  
![image](https://github.com/emanuelemorais/exercicios_mod7/assets/99221221/bf455fe8-0bf5-4b91-b65e-8e1bde27e5da)

- Coluna "tipo de ocorrencia"
  
![image](https://github.com/emanuelemorais/exercicios_mod7/assets/99221221/4e6f05ec-08d6-4b2f-974b-3b00878af243)

- Coluna "sentido"

![image](https://github.com/emanuelemorais/exercicios_mod7/assets/99221221/b56d6ea7-0927-4bac-9107-46325f68f47d)

### Execução do modelo

Para a criação do modelo foi usado o Pycaret para criação de um modelo de classificação, sendo o target do modelo a coluna gravidade. Após executar a comparação dos modelos obtive os segunter resultados:

![image](https://github.com/emanuelemorais/exercicios_mod7/assets/99221221/ca6f2452-a105-43eb-b480-7df7b7528fa5)

O modelo "Decision Tree Classifier" foi apontado como o de melhor performace comparado a outros pelo pycaret, sendo assim, foi o escolhido para execução da atividade.

## Construção do container Docker

A imagem criada pode ser encontrada em https://hub.docker.com/r/manumorais1231/ponderada3. Para a construção do dockerfile foram feitos os seguinter passos:

- Importação da versão do python aceita pelo pycaret
```
FROM python:3.10
```
- Criação do diretório src dentro com conteiner
```
WORKDIR /src
```
- Copia de todos os arquivos para dentro do container
```
COPY . .
```
- Instalação das bibliotecas e pacotes necessários para a aplicação (uvicorn, fastapi, pandas, pycaret, pydantic)

```
RUN pip install -r requirements.txt
```
- Exposição da porta 8000
```
EXPOSE 8000
```
- Comando que irá iniciar a API em FASTapi
```
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Documentação da API

A API criada possui duas rotas.

- Rota inicial `/`
Essa rota é responsável por renderizar um frontend simples feito com HTML para input de variáveis e nova previsão.

![image](https://github.com/emanuelemorais/exercicios_mod7/assets/99221221/0f750ac5-9a9a-4513-9fb9-c6bc8c852839)

- Rota de previsão `/nova_previsao`
Essa é rota responsável por fazer uma nova previsão. Para isso, os valores enviados por essa rota são passados pelo modelo pré treinado e como resposta da requisição são enviados os valores que o modelo previu.

## Video do funcionamento

Um vídeo do funcionamento da solução pode ser visto no link: https://drive.google.com/file/d/1q4abZLvMg6DX5p4jMlas-LPjjb4GvQiI/view?usp=sharing

## Instruções para rodar a aplicação

Para rodar a aplicação é necessário seguir os seguintes passos (pré requisito ter docker na máquina:
- Clonar este repositorio
- No diretorio `exercicios_mod7/ponderada3` executar o comando `docker build -t nome_da_imagem .`
- Após finalização do comando acima, no mesmo diretorio rodar `docker run -p 8000:8000 nome_da_imagem`
- Após rodar o comando acima acessar no navegador `0.0.0.0:8000`
- Para fazer um nova previsão é preencher os valores de tipo de acidente, tipo de ocorrencia e sentido. A previsão irá aparecer abaixo do texto "A previsão é:"


