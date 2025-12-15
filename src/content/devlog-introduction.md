---
title: "Comment j'ai configuré mon serveur NGINX"
date: "2025-12-15"
description: "Un petit guide sur la configuration de reverse proxy et SSL avec Docker."
---

## Introduction

Hier, je travaillais sur le déploiement de **Weathermellon** et j'ai rencontré un problème avec les certificats SSL. Voici comment je l'ai résolu.

### Le problème

Mon conteneur Docker refusait la connexion sur le port 443.

### La solution

J'ai dû modifier mon fichier `nginx.conf`. Voici l'extrait important :

```nginx
server {
    listen 443 ssl;
    server_name weathermellon.info;

    ssl_certificate /etc/nginx/certs/fullchain.pem;
    ssl_certificate_key /etc/nginx/certs/privkey.pem;

    location / {
        proxy_pass http://app:3000;
    }
}
