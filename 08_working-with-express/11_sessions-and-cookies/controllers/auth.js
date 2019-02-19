const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req
    //     .get('Cookie')
    //     .split(';')[0]
    //     .trim()
    //     .split('=')[1];

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
        res.redirect('/')
    }).catch(err => console.log(err))
}

// <!-- <% if(isAuthenticated) {%>
//     <li class="main-header__item">
//         <a class="<%= path === '/admin/add-product' ? 'active' : '' %>" href="/admin/add-product">Add Product
//         </a>
//     </li>
//     <li class="main-header__item">
//         <a class="<%= path === '/admin/products' ? 'active' : '' %>" href="/admin/products">Admin Products
//         </a>
//     </li>
//     <%}%> -->
