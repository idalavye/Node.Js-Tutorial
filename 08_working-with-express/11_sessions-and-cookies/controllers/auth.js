const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: false
    });
};

exports.postLogin = (req, res, next) => {
    User.findById('5c68538130205e61c843b6ab').then(user => {
        req.session.user = user;
        req.session.isLoggedIn = true;
        req.session.save().then(err => {
            console.log(err);
            res.redirect('/');
        })
    }).catch(err => console.log(err))
}

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    })
}
