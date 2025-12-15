---
title: "Devlog #1 - Stack technique : Nuxt, Postgres et Prisma pour Beau & Bon"
date: 2025-12-15
tags: ["DevLog", "Architecture", "Nuxt", "Postgres", "Prisma", "CI/CD"]
description: "Choix de stack technique pour la refonte de Beau & Bon : Nuxt + Tailwind en frontend, Node.js + Express + Postgres + Prisma + Zod en backend."
---

Aujourd'hui, je commence le développement de la nouvelle plateforme **Beau & Bon**. Le but : remplacer leur système actuel par une solution sur-mesure qui gère à la fois la vente de produits et la réservation d'ateliers.

Pour cette première journée, j'ai décidé de laisser l'interface de côté et de me concentrer sur les fondations du backend.

## Choix de stack

### Frontend : Nuxt + Tailwind

J'ai opté pour **Nuxt** plutôt que Next.js pour plusieurs raisons. D'abord, j'ai plus d'expérience avec Vue, et Nuxt offre une structure similaire à Next.js mais avec un écosystème que je maîtrise mieux. Le SSR intégré est parfait pour le SEO, et je ne voulais pas me casser la tête en implémentant quelque chose qui existe et marche déjà bien.

**Tailwind** pour le styling parce que je veux aller vite sans perdre en qualité.

### Backend : Node.js + Express + Postgres + Prisma + Zod

**Node.js + Express** : choix classique mais efficace.

**Postgres** : j'avais besoin d'une base relationnelle solide pour gérer les relations entre produits, ateliers, commandes et utilisateurs. Postgres gère bien les transactions, ce qui est crucial pour la gestion des stocks.

**Prisma** : Facilite énormément la gestion de postgres, et s'intègre super bien avec mon stack.

**Zod** : validation des données côté API. Chaque requête est validée avant d'arriver dans la logique métier. Ça évite les bugs et rend le code plus prévisible.

## Architecture et stabilité

J'ai mis en place un CI très simple avec GitHub Actions dès le début. Je veux que le projet puisse évoluer dans le temps et les tests sont primordial à cet égard.

## Prochaines étapes

Les fondations sont en place, il me reste toutefois beaucoup à faire :)
