const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            //npm install validator@5.6.0 --save
            validator: (value) => {
                return validator.isEmail(value);
            },
            //validator: validator.isEmail => Bu şekilde kısaltarak da kullanabilirdik.
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});


UserSchema.methods.toJSON = function () {
    var user = this; //instance methodlar get called with the individual document model 
    var userObject = user.toObject(); //user mongoose modelini normal javascript objesine çevirecek

    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
    var user = this; //arrow function kullanmak yerine normal fonksiyon kullanmayı tercih ettim. Çünkü this anahtar kelimesini kullanmak istiyorum

    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123');

    user.tokens = user.tokens.concat([{ access, token }]);

    return user.save().then(() => {
        return token;
    });
};

var User = mongoose.model('User', UserSchema);

module.exports = { User };