# Verwende das neueste Node-Image
FROM node:latest

# Definiere das Arbeitsverzeichnis
WORKDIR /usr/src/app

# Installiere PHP (und die benötigten Erweiterungen für Composer)
RUN apt-get update && apt-get install -y \
    php-cli \
    php-zip \
    php-xml \ 
    php-curl \
    unzip \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Installiere Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Kopiere nur die package.json und package-lock.json (falls vorhanden)
COPY package*.json ./
COPY nodemon.json ./

# Installiere npm-Abhängigkeiten
RUN npm install

# Setze den Port als Umgebungsvariable
ARG PORT=5000
ENV PORT $PORT

# Exponiere den Port
EXPOSE $PORT

# Definiere den Startbefehl
CMD ["npx", "nodemon", "bin/www/server.js"]
