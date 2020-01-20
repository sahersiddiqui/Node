var router = require('express').Router();

router.get('/', function (req: any, res: any, next: Object) {
    res.send({ message: "All ok" })
});

import User from "./users"
import Category from "./category"

//include all route
router.use('/user', User);
router.use('/category', Category);

router.use(function (err: any, req: any, res: any, next: CallableFunction) {
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

export default router