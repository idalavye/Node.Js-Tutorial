require('../config/config');

const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');

var { mongoose } = require('./db/db');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
var { authenticated } = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

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

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});

//patch update işlemlerini karşılar
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;

    var body = _.pick(req.body, ['text', 'completed']); //pick metodu text ve completed propertylerini alır
    /**
        var object = { 'a': 1, 'b': '2', 'c': 3 };
        _.pick(object, ['a', 'c']);
        // => { 'a': 1, 'c': 3 }
     */

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    /**
     _.isBoolean(false);
     // => true
 
    _.isBoolean(null);
    // => false
     */

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    //new : true Orijinalden ziyade değiştirilmiş belgeyi döndürmek için true. varsayılanlar false
    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo: todo });
        //res.send({todo})
    }).catch((e) => {
        res.status(400).send();
    });
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => { //generateAuthToken metodundaki user.save methodunun dönüşünün promise'ı
        res.header('x-auth', token).send(user);
    }).catch((err) => res.status(400).send(err));
});

//POST /users/login {email,password}
app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        // res.send(user);
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/users/me', authenticated, (req, res) => {
    res.send(req.user);
});

app.listen(port, () => {
    console.log('Started on port ' + port);
});

module.exports = { app };