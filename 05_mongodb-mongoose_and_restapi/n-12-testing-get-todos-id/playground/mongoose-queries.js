const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/db');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');


// FOR TODOS

// var id = '5b9d6bab1e958ce40f539692';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id // ObjectId kullanmamıza gerek yok. Mongoose bizim için bunu yapacak.
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//     console.log('Todo', todo);
// }).catch((err) => {
//     console.log(err);
// });

//FOR USER

User.findById('5b9a5cef608cbce42b5b9a24').then((user) => {
    if (!user) {
        return console.log('Unable to find user');
    }
    console.log('User', user);
}, (err) => {
    console.log(err);
});