const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

const users = [];

app.get('/user', (req, res, next) => {
    res.render('users', { users: users });
});

app.get('/', (req, res, next) => {
    res.render('index');
});


app.post('/add-user', (req, res) => {
    users.push({ name: req.body.name });
    res.redirect('/user');
});


app.listen(3000);
