var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'İbrahim'
    };

    //Gerçek dünyada veriler delaylı olarak gelir.
    setTimeout(() => {
        callback(user);
    }, 3000);
};

getUser(31, (userObject) => {
    console.log(userObject);
});