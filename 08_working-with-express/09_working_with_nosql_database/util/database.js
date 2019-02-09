const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://ibrahimdagdelen:7Enu8wafeSta@nodejs-shopapp-kgsni.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
        .then((client) => {
            console.log('Connected');
            /**
             * client => veritabanına erişmemize izin verecek
             */
            callback(client);
        }).catch((err) => {
            console.log(err);
        });;
}

module.exports = mongoConnect;

