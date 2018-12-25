const express = require('express');

const app = express();

app.use("/user",(req, res, next) => {
    res.send("<h1>This 'User Page'</h1>")
});

app.use("/" , (req, res, next) => {
    res.send("<h1>This home page</h1>")
});

app.listen(3000);