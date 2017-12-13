var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const URL = mongoose.model('URL');

const urlHelper = require('../controllers/url-helper');

router.get('/urls/:userID', function(req, res, next) {
    URL.find({
        user: req.params.userID
    }).sort({dateAdded: 'desc'})
    .then((results) => {
        res.send(results);
    });
});

/* POST request to make new shortened url  */
router.post('/create', function(req, res, next) {
    if (!urlHelper.isValidURL(req.headers.url)) {
        res.status(500).send({message: "Invalid URL"});
    }

    const originalUrl = urlHelper.appendHttp(req.headers.url),
          redirectUrl = urlHelper.generateShortenedURL();

    URL.create({
        originalUrl,
        redirectUrl,
        user: 12345,
        dateAdded: new Date().toISOString(),
        hitCounter: 0
    }).then(() => {
        res.send({message: "URL generated"});
    }).catch((err) => {
        res.send(err);
    })
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
