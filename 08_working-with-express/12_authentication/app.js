const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = 'mongodb://localhost:27017/shop';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

//urlencoded sadece text türünde veriler alır. Resim ise binary türünde bir dosyadır. Bu yüzden bunun için ayrı bir kütüphane kullanırız. (multer)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: 'images' }).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  /**
   * Aşarıdakiler artık tüm responlarımıza eklenecek. Herbir render metoduna tekrar tekrar eklemiycez
   */
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  /**
   * Burada error fırlatırsak get500 bunu yakalıyacak ve /500'e redirect yapmaya çalışacak ve tekrak buraya gelecek, bu 
   * şekilde sonsuz bir döngü içerisinde kalıcak. Bunun için get500 metodunda redirect yerine direk 500.ejs sayfasına 
   * response yapabiliriz.
   */

  /**
   * Express.js error handler syncron hataları yakalayabilirken asyncron hatalar yakalayamaz. Bu hataları yakalaması için 
   * next(err) şeklinde hata fırlatmalıyız.
   */
  // throw new Error('Dummy Error');
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      // throw new Error('asdf');
      req.user = user;
      next();
    })
    .catch(err => {
      //Bu şekilde errorlar express tarafından yakalanılmıyor.
      // throw new Error(err);
      next(new Error(err));
    });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);
app.use(errorController.get404);

/**
 * next(err) metoduna bir error yerleştirdğimiz zaman express.js bunu anlayacak ve error parametresi bulunmayan tüm 
 * middleware'leri atlayacaktır. En son aşağıdaki metotda error parametresi olduğu için burada yakalanılacak.
 */
app.use((error, req, res, next) => {
  // res.status(error.httpStatusCode).render(....);
  // res.redirect('/500');
  res.status(500).render('500', {
    pageTitle: 'Error',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  });
});

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
