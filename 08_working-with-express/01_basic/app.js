const express = require('express');

const app = express();
app.use((req, res, next) => {
    console.log('In the middleware!!');
    next(); //Bir sonraki middleware 'in çalışmasına izin verir. Eğer bir middleware kullanmazsak bir sonraki middleware'i kullanmayacaktır.
});

app.use("/add-product",(req, res, next) => {
    console.log('In another middleware2!!');

    res.send('<h1>The "Add Product Page" </h1>');
    //send metodundan sonra next kullanamayız
});

app.use("/",(req, res, next) => {
    console.log('In the middleware2!!');
    /**
     * Express.js in bize sunmuş olduğu send metodu otomatik olarak content-type 'ını bizim için belirler.
     * res.setHeader() kullanmamıza gerek kalmaz.
     */
    res.send('<h1>Hello From Express!</h1>')
});

app.listen(3000);