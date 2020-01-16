var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const { sanitizeBody } = require('express-validator');
const { check, validationResult } = require('express-validator');


var User = require(process.cwd() + "/models/user.model.js")

/* GET users listing. */
router.get('/', (req, res, next) => {
	User.find({}, (err, data) => {
		if (err) {
			return next(err)
		} else {
			return res.send(data)
		}
	})
});

//create user
router.post(
	'/',
	[
		// username must be an email
		check('name').not().isEmpty(),
		// password must be at least 5 chars long
		check('email').isEmail()

	],
	(req, res, next) => {
		// Finds the validation errors in this request and wraps them in an object with handy functions
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		User.create({
			name: req.body.name,
			email: req.body.email
		}).then(user => res.json(user));
	}
);

/**
 * Get Single user detail
 */
//create user
router.get(
	'/:id',
	(req, res, next) => {
		User.find({ _id: req.params.id }).then(user => res.send(user));
	}
);

module.exports = router;
