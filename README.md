# Projet Fullstack

## Introduction

Ce projet est une application web simple qui permet de gérer des articles. Les utilisateurs peuvent consulter une liste d'articles et ajouter de nouveaux articles. Le projet utilise Node.js pour le backend et un fichier JSON pour stocker les données.

## Fonctionnalités

- **Affichage des articles** : Récupère et affiche les articles stockés dans un fichier JSON.
- **Ajout d'articles** : Permet d'ajouter de nouveaux articles dans le fichier JSON.
- **Mise en cache** : Utilise un cache pour améliorer les performances en réduisant les lectures du fichier JSON.

## Installation

1. Clonez le dépôt :
  
```sh
    git clone https://github.com/isaackouka225/fullstack.git
    cd fullstack
```

2. Installez les dépendances :

```sh
    npm install
```

3. Démarrez le serveur :

```sh
    node server.js
```

4. Ouvrez votre navigateur et allez à http://localhost:8080. (qui est mon serveur local initialisé dans mon projet)

## Utilisation

Consulter les articles : Utiliser l'outil Postman pour envoyer une requête GET à http://localhost:8080/articles
Ajouter un article : Utilisez un outil comme Postman pour envoyer une requête POST à http://localhost:8080/articles avec un corps JSON contenant les champs title, description et likes.



