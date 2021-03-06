var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

// var newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (err) => {
//     console.log('Unable to save todo');
// })

var newTodo = new Todo({
    text: 'Make a cook',
    completed: false,
    completedAt: new Date().getTime()
});

newTodo.save().then((doc) => {
    console.log('Saved todo',doc);
}, (err) => {
    console.log('Unable to save todo');
})