const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/db');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove({}).then((result) => { //Tüm kayıtları silecek
//     console.log(result);
// });

// Todo.findOneAndRemove({_id:'5bab5e206bee02e1776afe1e'})..... //İlk bulduğunu silecek
// Todo.findByIdAndRemove()


Todo.findByIdAndRemove('5bab5e206bee02e1776afe1e').then((todo) => {
    console.log(todo);
});

