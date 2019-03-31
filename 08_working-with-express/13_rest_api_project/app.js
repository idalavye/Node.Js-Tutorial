const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const feedRoutes = require("./routes/feed");

const app = express();
/**
 * Formdan gelen verileri yakalamak için urlencoded oldukça faydalıdır.
 */
// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>

/**
 * application/json
 * Gelen veriler artık json formatında dönüştürülecek.
 * smp: const content = req.body.content;
 * Yukarıdaki gibi body tagıyla yakalayabilecez.
 */
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  /**
   * (*) ile tüm clientlere erişim izni veriyoruz. Buraya bir tane client'de verebilirdik.
   * (,) kullanarak ta birden fazla client belirtebilirdik.
   */
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect("mongodb://localhost:27017/chat")
  .then(result => {
    app.listen(8080);
  })
  .catch(err => console.log(err));
