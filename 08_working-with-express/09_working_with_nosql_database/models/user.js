const db = require('../util/database').getDb;
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;

class User {
    constructor(username, email) {
        this.name = username;
        this.email = email;
    }

    save() {
        const db = db.getDb();
        return db.collection('users').insertOne(this);
    }

    static findById(userId) {
        const db = db.getDb();
        return db.collection('users').findOne({ _id: new ObjectID(userId) });
    }
}

module.exports = User;