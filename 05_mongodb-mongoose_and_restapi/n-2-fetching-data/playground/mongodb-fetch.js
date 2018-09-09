const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDb Server');
    }

    console.log('Connected to mongodb server');

    // db.collection('Todos').find({ completed: false }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });


    //db mizdeki id property si bir string değildir. Bu yüzden id ile arama yaparken ObjectID kullanmalıyız.
    db.collection('Todos').find({ _id: new ObjectID('5b9587d90065782a74ae0321') }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    })

    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count ${count}`)
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });

    db.collection('Users').find({ name: 'İbrahim' }).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    });

    db.close();
});