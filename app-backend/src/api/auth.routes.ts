import { Router, Response, Request } from 'express';
import config from 'config';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import User from '../models/User';

const router = Router();

// api/auth/register
router.post(
	'/register',
	[
		check('email', 'Invalid email').isEmail(),
		check('password', 'Minimum password length is 6 symbols').isLength({ min: 6 }),
	],
	async (req: Request, resp: Response) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return resp.status(400).json({
					errors: errors.array(),
					message: 'Invalid registration information',
				});
			}

			User.findOne({ email: req.body.email }).then((user) => {
				if (user) {
					return resp.status(400).json({ message: 'A user has already registered with this email' });
				}
				User.findOne({ userName: req.body.username }).then((existingUser) => {
					if (existingUser) {
						return resp.status(400).json({ message: 'A user has already registered with this username' });
					}
					const newUser = new User({
						userName: req.body.username,
						email: req.body.email,
						password: req.body.password,
					});
					newUser.save();

					const token = jwt.sign(
						{ userName: newUser.userName },
						config.get('jwtSecret'),
						{ expiresIn: '1h' },
					);

					return resp.status(201).json({ message: 'New user has been registered', token, userName: newUser.userName });
				});
			});
		} catch (e) {
			return resp.status(500).json({ message: 'Something went wrong, try again' });
		}
	},
);

// api/auth/login
router.post(
	'/login',
	[
		check('email', 'Enter valid email').normalizeEmail().isEmail(),
		check('password', 'Enter a correct password').exists().isLength({ min: 6 }),
	],
	async (req: Request, resp: Response) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return resp.status(400).json({
					errors: errors.array(),
					message: 'Invalid authorization information',
				});
			}

			User.findOne({ email: req.body.email }).then((user) => {
				if (!user) {
					return resp.status(400).json({ message: 'There is no user with this email' });
				}
				const passwordMatch = req.body.password === user.password;

				if (!passwordMatch) {
					return resp.status(400).json({ message: 'Invalid email or password, try again' });
				}

				const token = jwt.sign(
					{ userId: user.id },
					config.get('jwtSecret'),
					{ expiresIn: 36000 },
				);

				resp.json({ token, userId: user.id, userName: user.userName });
			});
		} catch (e) {
			return resp.status(500).json({ message: 'Something went wrong, try again' });
		}
	},
);

module.exports = router;
