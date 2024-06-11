const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/articles', (req, res) => {
    fs.readFile('database.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading database');
        } else {
            res.send(JSON.parse(data));
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
