FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 

ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

RUN pip install --no-cache-dir -r requirements.txt
CMD exec gunicorn --bind :8000 --workers 1 --worker-class uvicorn.workers.UvicornWorker --threads 8 app.main:app
EXPOSE 8000