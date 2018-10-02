var { User } = require('../models/user');

var authenticated = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject(); //Bu şekilde kullanıldığında bu metot durdurulacak ve catch metodu çağrılacaktır. 
        }

        req.user = user;
        req.token = token;
        next();
    }).catch((err) => {
        //401 unauthenticated
        res.status(401).send(err);
    });
}

module.exports = { authenticated };

