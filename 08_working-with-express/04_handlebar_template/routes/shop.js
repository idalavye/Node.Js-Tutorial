const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  const products = adminData.products;
  //render => bu expressjs tarafından sağlanır ve varsayılan şablon motorunu kullanır.
  res.render('shop', { prods: products, docTitle: 'Shop', path: '/shop', hasProducts: products.length > 0 });
});

module.exports = router;
