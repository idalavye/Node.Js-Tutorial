const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDb Server');
    }

    console.log('Connected to mongodb server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b97819d3b5f6d11ec526a43')
    // },
    //     {
    //         $set: {
    //             completed: true
    //         }
    //     }, {
    //         returnOriginal: false
    //     }).then((result) => {
    //         console.log(result);
    //     });


    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b97819d3b5f6d11ec526a44')
    }, {
            $set: {
                name: 'Osman'
            },
            $inc: {
                age: 1
            }
        }).then((result) => {
            console.log(result);
        });

    //db.close();
});