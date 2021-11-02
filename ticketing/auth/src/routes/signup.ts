import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
//import { Jwt } from 'jsonwebtoken';
var jwt = require('jsonwebtoken');

import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestError } from './../errors/bad-request-error';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ], 
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      console.log(errors.array());
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();
    
    // Generate JWT
    const userJwt = jwt.sign({
      data: {
        id: user.id,
        email: user.email
      }
    }, '123456', { expiresIn: '1h' });

    // Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };