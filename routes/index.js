var express = require('express');
var router = express.Router();
var database = require('../db');


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.status(200).send('index');
});

module.exports = router;
