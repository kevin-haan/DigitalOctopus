#!/bin/sh

# Prüfe, ob Zertifikate bereits existieren
if [ ! -d "/etc/letsencrypt/live/digitaloctop.us" ]; then
    # Erstelle die Zertifikate
    certbot certonly --webroot --webroot-path=/data/letsencrypt --email kevin.haan@posteo.de --agree-tos --no-eff-email --force-renewal -d digitaloctop.us -d www.digitaloctop.us

    # Starte NGINX neu, um die neuen Zertifikate zu laden
    docker-compose -f ./docker-compose.yml restart nginx
fi
