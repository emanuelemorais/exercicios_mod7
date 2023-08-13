# Use a imagem base do Python
FROM python:3.11

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie os arquivos de requisitos e instale as dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copie o código fonte da aplicação para o diretório de trabalho
COPY /src .

ENV PATH="/src:$PATH"

# Exponha a porta 80
EXPOSE 80

# Comando para iniciar a aplicação (ajuste de acordo com sua aplicação)
CMD ["flask", "run", "--host=0.0.0.0", "--port=80"]
