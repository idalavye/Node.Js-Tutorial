const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('./../../models/todo');
const { User } = require('./../../models/user');



const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'idalavye@gmail.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'idalavye2@gmail.com',
    password: 'userTwoPass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userTwoId, access: 'auth' }, 'abc123').toString()
    }]
}]



const todos = [{
    _id: new ObjectID(),
    text: 'First todo',
    _creator: userOneId
}, {
    _id: new ObjectID(),
    text: 'Second Todo',
    completed: true,
    completedAt: 333,
    _creator: userTwoId
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
}

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo]); //Bu method userOne ve userTwo promise larının callbacklerini bekliyecek, sorun çıkmazsa then methoduna girecek.
    }).then(() => done());
}

module.exports = { todos, populateTodos, users, populateUsers };