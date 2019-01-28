
const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', { pageTitle: 'Add Product', formCSS: true, productCSS: true, activeAddProduct: true, path: '/add-product' });
}

exports.postAddProduct = (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/shop',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
}