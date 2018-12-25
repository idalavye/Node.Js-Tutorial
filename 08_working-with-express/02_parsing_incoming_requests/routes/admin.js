const path = require('path');
const express = require('express');
const router = express.Router(); //exprees router mini bir express uygulaması gibi düşünebiliriz. Ana express uygulamasına bağlanabilir.

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
});

/**
 * Eğer form actionda admin/add-product o anki url'in sonuna path'i ekler => http://localhost:3000/admin/admin/add-product
 * Eğer /admin/add-product şeklinde kullanırsam http://localhost:3000/admin/add-product tetiklenir.
 */

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    /**
     * Express.js requesti otamatik olarak parse etmez. Bunun için bir middleware kullanırız.
     * app.use(bodyParser.urlencoded({extended:false}));
     */
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;