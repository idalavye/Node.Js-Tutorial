const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        //Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 }
            if (!err) {
                cart = JSON.parse(fileContent);
            }

            //Analyze the cart => find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];

            let updatedProduct;
            //Add new product / increase quantity
            if (existingProduct) {
                updatedProduct = { ...existingProduct }
                updatedProduct.qty = updatedProduct.qty + 1;

                //Update previous product
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 }
                //Add new product
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice += +productPrice;

            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log('addProduct', err);
            })
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const updateCard = { ...JSON.parse(fileContent) };
            const product = updateCard.products.find(prod => prod.id === id);
            const productQty = product.qty;
            updateCard.products = updateCard.products.filter(prod => prod.id !== id);
            updateCard.totalPrice = updateCard.totalPrice - productPrice * productQty;

            fs.writeFile(p, JSON.stringify(updateCard), err => {
                console.log(err);
            })
        })
    }
}