const products = [];

module.exports = class Product {
    constructor(title) {
        this.title = title;
        this.deneme = 'deneme';
    }

    save() {
        //this => Product { title: 'Product Name' }
        products.push(this);
    }

    static fetchAll() {
        return products;
    }
}