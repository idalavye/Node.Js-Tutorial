const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  //render => bu expressjs tarafından sağlanır ve varsayılan şablon motorunu kullanır.
  res.render('shop');
});

module.exports = router;
