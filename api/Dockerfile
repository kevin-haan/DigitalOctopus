# Verwende das neueste Node-Image
FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

# Setze den Port als Umgebungsvariable
ARG PORT=5000
ENV PORT $PORT
EXPOSE $PORT

CMD ["npx", "nodemon", "bin/www/server.js"]
