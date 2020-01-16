var router = require('express').Router();

router.get('/', function (req, res, next) {
    console.log(req.query)
    res.send(req.query)
});

router.use('/user', require('./users'));

router.use(function (err, req, res, next) {
    if (err.name === 'ValidationError') {
        return res.status(422).json({
            errors: Object.keys(err.errors).reduce(function (errors, key) {
                errors[key] = err.errors[key].message;

                return errors;
            }, {})
        });
    }
    return next(err);
});



module.exports = router;