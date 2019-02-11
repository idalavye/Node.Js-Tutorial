const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

// /**
//  * Aşarıdaki istek hiçbir zaman tetiklenmeyecektir. Çünkü yukarıdaki istek dynamic 
//  * olarak path aldığı için ../delete isteğini de karşılayacaktır. Eğer bunu kullanmak 
//  * istiyorsak aşarıdaki isteği yukarı taşımalıyız.
//  * 
//  * 
//     router.get('/products/delete');
//  */

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

// router.get('/orders', shopController.getOrders);

// router.post('/create-order', shopController.postOrder);

// router.get('/checkout', shopController.getCheckout);

module.exports = router;
