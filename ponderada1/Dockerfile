FROM python:3.11

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY /src .

ENV PATH="/src:$PATH"

EXPOSE 80

CMD ["flask", "run", "--host=0.0.0.0", "--port=80"]
