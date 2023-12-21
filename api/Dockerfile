# Verwende das neueste Node-Image
FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
RUN chmod +x /usr/src/app/node_modules/.bin/nodemon
# Setze den Port als Umgebungsvariable
ARG PORT=5000
ENV PORT $PORT
EXPOSE $PORT

CMD ["npx", "nodemon", "bin/www/server.js"]
