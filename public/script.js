const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const NodeCache = require('node-cache');
const path = require('path');
const app = express();
const port = 8080;

// Initialisation du cache
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Servir les fichiers statiques depuis le répertoire 'public'

// Route GET pour récupérer les articles depuis le fichier database.json
app.get('/articles', (req, res) => {
    try {
        // Vérifier si les articles sont en cache
        const cachedArticles = cache.get("articles");
        if (cachedArticles) {
            return res.send(cachedArticles);
        } else {
            // Lire le contenu du fichier database.json
            fs.readFile('database.json', (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Erreur lors de la lecture du fichier database.json');
                }
                const articles = JSON.parse(data);
                cache.set("articles", articles);
                res.send(articles);
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur de lecture de la base de données');
    }
});

// Route POST pour créer un nouvel article
app.post('/articles', (req, res) => {
    try {
        // Lire le contenu du fichier database.json
        fs.readFile('database.json', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erreur lors de la lecture du fichier database.json');
            }
            // Parse JSON
            let articles = JSON.parse(data);
            // Ajouter le nouvel article
            const newArticle = {
                id: articles.length + 1,
                title: req.body.title,
                description: req.body.description,
                likes: req.body.likes || 0
            };
            articles.push(newArticle);
            // Écrire dans le fichier database.json
            fs.writeFile('database.json', JSON.stringify(articles), (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Erreur lors de l\'enregistrement dans la base de données');
                }
                cache.del("articles"); // Supprimer les articles du cache
                res.status(201).send(newArticle);
            });
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Erreur lors de la création de l\'article');
    }
});

// Route pour la racine de l'application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Utiliser path.join pour obtenir le chemin absolu
});

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
