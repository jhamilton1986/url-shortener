var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const URL = mongoose.model('URL');

/* GET home page. */
router.post('/create', function(req, res, next) {
    URL.create({
        originalUrl: "http://blah.com",
        redirectUrl: "http://yay.com",
        user: "12345",
        dateAdded: new Date().toISOString(),
        hitCounter: 0
    }).then(() => {
        return "hey!";
    });
  
});

module.exports = router;
