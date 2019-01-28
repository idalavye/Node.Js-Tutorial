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
    constructor(title) {
        this.title = title;
        this.deneme = 'deneme';
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