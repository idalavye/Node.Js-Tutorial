exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req
    //     .get('Cookie')
    //     .split(';')[0]
    //     .trim()
    //     .split('=')[1];

    console.log(req.session.isLoggedIn);
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login'
    });
};

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true;
    res.redirect('/')
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
