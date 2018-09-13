var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1, //Boş değer girmesini önleyecek
        trim: true, //text = '   ' veya text='   Some todo   ' girildiğinde baştaki ve sondaki boşlukları kaldıracak...
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
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

// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (err) => {
//     console.log('Unable to save todo');
// })

var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

var user = new User({
    email:'idalavye@gmail.com'
});

user.save().then((doc) => {
    console.log('User saved', doc);
}, (err) => {
    console.log('Unable to save user', err);
});