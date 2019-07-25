var express = require('express');
var router = express.Router();


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(req)
  res.status(200).send('respond with a resource' + req.params);
});

module.exports = router;
