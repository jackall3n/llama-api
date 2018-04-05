var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */
router.get('/access_token', function (req, res, next) {
    res.send({title: 'Express'});
});

module.exports = router;
