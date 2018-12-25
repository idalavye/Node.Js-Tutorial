const path = require('path');
const router = require('express').Router();

/**
 * Eğer burada use kullanırsak app.js'deki import sıralamamıza göre aşarda kalan pathler çalışmayacaktır. Eğer burada get kullanırsak
 * react'taki exact gibi bir işlev kazanacak ve sadece / bu şekil url'de tetiklenecek.
 */
router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});

module.exports = router;