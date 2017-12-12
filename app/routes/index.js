var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const URL = mongoose.model('URL');

/* GET full URL and redirect */
router.get('/:redirectID', (req, res, next) => {
  URL.findOneAndUpdate({
    redirectUrl: req.params.redirectID
  }, {$inc: {'hitCounter' : 1}})
  .then((doc) => {
    if (doc) {
      res.redirect(doc.originalUrl);
    } else {
      res.redirect('http://localhost:3000');
    }
  });
});

module.exports = router;
