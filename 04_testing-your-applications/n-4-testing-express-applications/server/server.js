var express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.status(404).send({
        error: 'Page not found.',
        name: 'Todo App v1.0'
    });
});

app.get('/users', (req, res) => {
    res.status(200).send([
        {
            name: 'İbrahim',
            age: 20
        },
        {
            name: 'Mevlüt',
            age: 21
        }
    ]);
});

app.listen(3000, () => {
    console.log('server is deployed to 3000 port')
});

module.exports.app = app;