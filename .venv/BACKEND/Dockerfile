# syntax=docker/dockerfile:1
FROM python:3.9

# Set workdir
WORKDIR /app

# Set env vars
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install dependencies
RUN pip install --upgrade pip 
COPY requirements.txt ./
RUN pip install -r requirements.txt

# copy project
COPY . .

