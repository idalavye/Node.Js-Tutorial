var express = require('express');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');

var { mongoose } = require('./db/db');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {

    // console.log(req.body);

    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (err) => {
        res.status(400).send(err);
    });
});

//GET /todos/12345
app.get('/todos/:id', (req, res) => {

    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        // res.send(todo);
        res.send({ todo }); //Bu şekilde bir kullanımda birden fazla object gönderebiliriz.
    }).catch((err) => {
        res.send(400).send(err); //id'nin yazım standartıyla ilgili bir hata çıkarsa buraya girer.
    });

    // res.send(req.params); 
    // {
    //     "id": "132"
    // }
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});

module.exports = { app };