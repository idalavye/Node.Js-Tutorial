const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
/**
 * Express, statik dizine göre dosyaları arar, bu nedenle statik dizinin adı URL'nin bir parçası değildir.
 * Express, statik dizinleri express.static katman işlevi ile ayarladığınız sırayla dosyaları arar.
 */
app.use(express.static(path.join(__dirname,'public')))

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "./", "views", "404.html"));
})

app.listen(3000);