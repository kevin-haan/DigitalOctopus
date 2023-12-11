# Stage 1: Build
FROM node:latest as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG PORT=5000
ENV PORT $PORT
EXPOSE $PORT

CMD ["npm", "run", "dev"]