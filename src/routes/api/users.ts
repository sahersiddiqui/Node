import { Router } from "express"
const { body } = require('express-validator');
const { sanitizeBody } = require('express-validator');
const { check, validationResult } = require('express-validator');

const router: Router = Router();

var User = require(process.cwd() + "/src/models/user.model.js")

/* GET users listing. */
router.get('/', (req, res, next) => {
	User.find({}, (err: any, data: any) => {
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
	(req: any, res: any, next: any) => {
		// Finds the validation errors in this request and wraps them in an object with handy functions
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		User.create({
			name: req.body.name,
			email: req.body.email
		}).then((user: Object) => res.json(user));
	}
);

/**
 * Get Single user detail
 */
router.get(
	'/:id',
	(req, res, next) => {
		User.find({ _id: req.params.id }).then((user: Object) => res.send(user));
	}
);
/**
 * Update  user detail
 */
router.put(
	'/:id',
	(req, res, next) => {
		User.find({ _id: req.params.id }).update(req.body).then((user: Object) => res.send(user));
	}
);

export default router
