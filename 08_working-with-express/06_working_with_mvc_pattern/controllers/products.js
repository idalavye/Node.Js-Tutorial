const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', { pageTitle: 'Add Product', formCSS: true, productCSS: true, activeAddProduct: true, path: '/add-product' });
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll();
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/shop',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
}