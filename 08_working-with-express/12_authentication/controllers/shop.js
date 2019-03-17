const fs = require('fs');
const path = require('path');

const PDFDocument = require('pdfkit');

const Product = require('../models/product');
const Order = require('../models/order');

const ITEMS_PER_PAGE = 3;

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      console.log(products);
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getIndex = (req, res, next) => {
  /**
   * query page string olarak geldği için önce bir sayıya çevirmek için başına 
   * artı ekledik. Eğer gönderilen parametre bir sayı değil ise bu undefined olacak 
   * ve yanındaki 1'i page değişkenine atıyacak.
   */
  const page = +req.query.page || 1;
  let totalItems;

  Product.find().count().then(numProducts => {
    totalItems = numProducts;
    return Product.find()
      /**
       * Eğer sayfa 2 de isem ilk iki item atlanacak. 
       */
      .skip((page - 1) * ITEMS_PER_PAGE)
      /**
       * limit ile en fazla ne kadar product getireceğimizi belirtiyoruz.
       */
      .limit(ITEMS_PER_PAGE);
  })
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPrevPage: page > 1,
        nextPage: page + 1,
        previusPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
        isAuthenticated: req.session.isLoggedIn
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findById(orderId).then(order => {
    if (!order) {
      return next(new Error('No order found.'));
    }

    /**
     * Bu order şu anki giriş yapan kişiye ait ise faturasını indirebilir.
     */

    if (order.user.userId.toString() !== req.user._id.toString()) {
      return next(new Error('Unauthorize'));
    }

    const invoiceName = 'invoice-' + orderId + '.pdf';
    const invoicePath = path.join('data', 'invoices', invoiceName);

    const pdfDoc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline: filename"' + invoiceName + '"');
    pdfDoc.pipe(fs.createWriteStream(invoicePath)); // Server'da bir tane pdf dosyası oluşturuyoruz.
    pdfDoc.pipe(res); //Daha sonra client e sunuyoruz.

    /**
     * Pdf içeriği....
     */
    pdfDoc.fontSize(26).text('Invoice', { underline: true });
    pdfDoc.text('----------------------------------------');
    let totalPrice = 0;
    order.products.forEach(prod => {
      totalPrice += prod.quantity * prod.product.price;
      pdfDoc.fontSize(14).text(prod.product.title + ' - ' + prod.quantity + ' x ' + '$' + prod.product.price);
    });
    pdfDoc.fontSize(20).text('-----');
    pdfDoc.text('Total Price:  $' + totalPrice);
    /**
     * Pdf içeriği...
     */
    pdfDoc.end();

    // => PRELOADING DATA (Tamamen okunmasını bekler sonra cliente gönderir)

    // fs.readFile(invoicePath, (err, data) => {
    //   if (err) {
    //     return next(err);
    //   }

    //   /**
    //    * Browser bunu gördüğü zaman pdf i tarayıcı üzerinde açacak
    //    */
    //   res.setHeader('Content-Type', 'application/pdf');
    //   /**
    //    * Eğer inline yerine attachment yazarsak browser pdf i açmak yerine indirme pencersini 
    //    * açar. Bu şekide headerlar ile browserın davranışlaını kontrol edebiliriz.
    //    */
    //   res.setHeader('Content-Disposition', 'inline: filename"' + invoiceName + '"');
    //   res.send(data);
    // });


    // => STREAMING DATA (Birkerede okuyup göndermek yerine parça parça okuyarak gönderir. Serverde her se
    //     seferinde sadece bir parça(chunk) okunur. Bu sayade sunucudaki memory boşa kullanılmamış olur.)

    // const file = fs.createReadStream(invoicePath);
    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', 'inline: filename"' + invoiceName + '"');
    // file.path(res);

  }).catch(err => {
    return next(err)
  });
}
