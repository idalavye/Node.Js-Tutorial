const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  const products = adminData.products;
  //render => bu expressjs tarafından sağlanır ve varsayılan şablon motorunu kullanır.
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/shop',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
    // layout:false // default layout'u kullanmak istemezsek
  });
});

module.exports = router;
