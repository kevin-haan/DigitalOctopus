# Stage 1: Build
FROM node:latest as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT

CMD ["npm", "run", "build"]