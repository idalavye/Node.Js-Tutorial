// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

// var user = {name:'İbrahim',age:20};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDb Server');
    }

    console.log('Connected to mongodb server');

    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if (err) {
            return console.log('Unable to the insert todo', err);
        }
        console.log(JSON.stringify(result.ops,undefined,2));
    });


    db.collection('Users').insertOne({
        // _id:123
        name: 'İbrahim',
        age: 20,
        location: 'Sakarya'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to the insert todo', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
        console.log(result.ops[0]._id.getTimestamp());
    });

    db.close();
});