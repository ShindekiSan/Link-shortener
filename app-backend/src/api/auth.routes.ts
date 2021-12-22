import { Router } from 'express';
import config from 'config';
import jwt from 'jsonwebtoken';
import * as expressValidator from 'express-validator';
import { HydratedDocument } from 'mongoose';
import { TypedRequest, TypedResponse } from '../types/api';
import { UserModel } from '../types/models';
import User from '../models/User';

const router = Router();

interface TypedRegisterRequest {
  password: string,
  username: string,
  email: string,
}

interface TypedAuthorizeResponse {
  token?: string,
  userId?: string,
  userName?: string,
  message?: string,
  errors?: expressValidator.ValidationError[],
}

interface TypedLoginRequest {
  email: string,
  password: string,
}

// api/auth/register
router.post(
  '/register',
  [
    expressValidator.check('email', 'Invalid email').isEmail(),
    expressValidator.check('password', 'Minimum password length is 6 symbols').isLength({ min: 6 }),
  ],
  async (req: TypedRequest<TypedRegisterRequest>, resp: TypedResponse<TypedAuthorizeResponse>)
  : Promise<void | TypedResponse<TypedAuthorizeResponse>> => {
    try {
      const errors:expressValidator.
        Result<expressValidator.ValidationError> = expressValidator.validationResult(req);

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
          const newUser: HydratedDocument<UserModel> = new User({
            userName: req.body.username,
            email: req.body.email,
            password: req.body.password,
          });
          newUser.save();

          const token:string = jwt.sign(
            { userId: newUser._id },
            config.get('jwtSecret'),
            { expiresIn: 36000 },
          );

          return resp.status(201).json({
            token,
            userId: newUser._id,
            userName: newUser.userName,
          });
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
    expressValidator.check('email', 'Enter valid email').normalizeEmail().isEmail(),
    expressValidator.check('password', 'Enter a correct password').exists().isLength({ min: 6 }),
  ],
  async (req: TypedRequest<TypedLoginRequest>, resp: TypedResponse<TypedAuthorizeResponse>)
  : Promise<void | TypedResponse<TypedAuthorizeResponse>> => {
    try {
      const errors:expressValidator.
        Result<expressValidator.ValidationError> = expressValidator.validationResult(req);

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
        const passwordMatch:boolean = req.body.password === user.password;

        if (!passwordMatch) {
          return resp.status(400).json({ message: 'Invalid email or password, try again' });
        }

        const token:string = jwt.sign(
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

export default router;
