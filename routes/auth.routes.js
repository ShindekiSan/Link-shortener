const {Router} = require('express');
// const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator')
const router = Router();
const User = require('../models/User');

// api/auth/register
router.post(
    '/register', 
    [
        check('email', 'Invalid email').isEmail(),
        check('password', 'Minimum password length is 6 symbols').isLength( {min: 6 })
    ],
    async (req, resp) => {
    try {
        const errors  = validationResult(req);

        if (!errors.isEmpty()) {
            resp.status(400).json({ 
                errors: errors.array(),
                message: 'Invalid registration information'
            })
        }

        User.findOne({ email: req.body.email }).then((user) => {
            if (user) {
                return resp.status(400).json({ message: 'A user has already registered with this email' })
            } else {
                // const hashedPassword = await bcrypt.hash(req.body.password, 12)
                const newUser = new User({
                    userName: req.body.userName,
                    email: req.body.email,
                    password: req.body.password
                })
                newUser.save()
                return resp.status(201).json({ message: 'New user has been registered' })
            }
        })
    } catch (e) {
        resp.status(500).json({ message: 'Something went wrong, try again' })
    }
});

// api/auth/login
router.post(
    '/login',
    [
        check('email', 'Enter valid email').normalizeEmail().isEmail(),
        check('password', 'Enter a correct password').exists().isLength({ min: 6 })
    ],
    async (req, resp) => {
    try {
        const errors  = validationResult(req);

        if (!errors.isEmpty()) {
            resp.status(400).json({ 
                errors: errors.array(),
                message: 'Invalid authorization information'
            })
        }

        User.findOne({ email: req.body.email }).then((user) => {
            if (!user) {
                return resp.status(400).json({ email: 'There is no user with this email'})
            } else {
                const passwordMatch = password === user.password;

                if (!passwordMatch) {
                    return resp.status(400).json({ message: 'Invalid email or password, try again' });
                }

                const token = jwt.sign(
                    { userName: user.userName },
                    config.get('jwtSecret'),
                    { expiresIn: '1h' }
                )

                resp.json({ token, userName: userName })
            }
        })
    } catch (e) {
        resp.status(500).json({ message: 'Something went wrong, try again' })
    }
});


module.exports = router;