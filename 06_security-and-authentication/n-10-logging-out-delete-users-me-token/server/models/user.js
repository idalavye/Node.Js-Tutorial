const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;

    return User.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject(err);
                }

            });
        });
    });
}

UserSchema.statics.findByToken = function (token) {
    var User = this; //model methods get called with the model as this binding
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        // return new Promise((resolve, reject) => {
        //     reject(); // Bu şekilde kullanırsak findByToken metodunun çağrldığı yerde success methoduna girmeyecek
        // })

        return Promise.reject(); //reject methodunun içerisine error mesajı yazabiliriz.    
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token, //Bu, bu değeri sorgulamamızı sağlar
        'tokens.access': 'auth'
    });
}

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

UserSchema.pre('save', function (next) {
    //next methodunu çağırmazsak middleware hiçbir zaman tamamlanmaz ve bir sonraki aşamaya geçemez.
    var user = this;//individual document

    //Mail adresi güncellenirken şifrelenmiş hash'i birdaha şifrelemek istemeyiz. Bunun için password un değişip değişmediğini kontrol ederiz.
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

UserSchema.methods.removeToken = function (token) {
    var user = this;

    //$pull methodu mongodb'ye ait kullanışlı bir methottur.
    /**
     * pull ifadesi documentimizden field kaldırabilmemizi sağlar. Örneğin aşağıdaki kullanımda user.tokens.token value su 
     * argument den gelen value ile eşleşirse tokens array'ı doc'tan kaldırılacak
     */
    return user.update({
        $pull: {
            tokens: {
                token: token
            }
            //tokens: {token} kısayolunuda kullanabiliriz.
        }
    });
}

var User = mongoose.model('User', UserSchema);

module.exports = { User };