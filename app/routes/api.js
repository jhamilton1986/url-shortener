var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const URL = mongoose.model('URL');

const requestValidator = require('../controllers/request-validator');

function generateShortenedURL() {
    const text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
  
    return text;
}

router.get('/urls/:userID', function(req, res, next) {
    URL.find({
        user: req.params.userID
    }).then((results) => {
        res.send(results);
    });
});

/* POST request to make new shortened url  */
router.post('/create', function(req, res, next) {
    if (!requestValidator.isValidURL(req.headers.url)) {
        res.status(500).send({message: "Invalid URL"});
    }

    URL.create({
        originalUrl: req.headers.url,
        redirectUrl: generateShortenedURL(),
        user: req.headers.userID,
        dateAdded: new Date().toISOString(),
        hitCounter: 0
    }).then(() => {
        res.send({message: "URL generated"});
    });
});

/* DELETE shortened url  */
router.delete('/:urlID', function(req, res, next) {
    URL.remove({
        _id: req.params.urlID
    }).then(() => {
        res.send({message: "URL removed"});
    });
});

module.exports = router;
