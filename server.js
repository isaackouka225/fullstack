const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use(bodyParser.json());

app.get('/articles', (req, res) => {
    fs.readFile('database.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading database');
        } else {
            res.send(JSON.parse(data));
        }
    });
});

app.post('/articles', (req, res) => {
    fs.readFile('database.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading database');
        } else {
            const articles = JSON.parse(data);
            const newArticle = {
                id: articles.length + 1,
                ...req.body
            };
            articles.push(newArticle);
            fs.writeFile('database.json', JSON.stringify(articles), err => {
                if (err) {
                    res.status(500).send('Error saving to database');
                } else {
                    res.status(201).send(newArticle);
                }
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
