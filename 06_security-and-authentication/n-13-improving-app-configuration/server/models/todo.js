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
    },
    _creator: { //todo modelini kullanan User'ın bir nesne kimliği ve yaratıcısı olduğunu bilmesi için altçizgi kullanıyorum
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = { Todo };