const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'products.json');

const getProductsFromFile = (callback) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            callback([]);
        }
        callback(JSON.parse(fileContent));
    });
}

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            //this => Product { title: 'Product Name' }
            products.push(this);
            fs.writeFileSync(p, JSON.stringify(products), (err) => { console.log('getProductsFromFile:', err); })
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }
}