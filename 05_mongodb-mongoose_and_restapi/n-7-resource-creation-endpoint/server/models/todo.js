var mongoose = require('mongoose');

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

module.exports = {Todo};