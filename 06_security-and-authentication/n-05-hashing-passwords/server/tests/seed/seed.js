const { ObjectID } = require('mongodb');

const { Todo } = require('./../../models/todo');

var todos = [{
    _id: new ObjectID(),
    text: 'First todo'
}, {
    _id: new ObjectID(),
    text: 'Second Todo',
    completed: true,
    completedAt: 333
}];

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
}

module.exports = { todos, populateTodos };