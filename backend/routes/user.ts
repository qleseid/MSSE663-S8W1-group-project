import express = require('express');
import jwt = require('jsonwebtoken');

import environment = require('../environment');
import {getUser, getUsers, createUser, updateUser, checkPassword} from '../controllers/user';
import {User} from '../models/user';

// Define Router
export const userRoutes = express.Router();

// Creating api routes for user

// Get all Users
userRoutes.get('/getAllUsers', getUsers);

// Registration
userRoutes.post('/register', (req: any, res: any, next: any) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  // First check if user with this username exists. If it does, then return failure and message.
  getUser(true, req.body.username, (err: any, user: any) => {
    if (err) {
      next(err);
      throw err;
    } else if (user) {
      res.json({success: false, msg: 'Username already exists.'});
    } else {
      createUser(newUser, (error: any, data: any) => {
        if (error) {
          res.json({success: false, msg: 'Failed to register user with data: ' + data});
          next(error);
        } else {
          res.json({success: true, msg: 'Registration successful.'});
        }
      });
    }
  });
});


// Login
userRoutes.post('/login', (req: any, res: any, next: any) => {
  const username = req.body.username;
  const password = req.body.password;
  getUser(true, username, (err: any, user: any) => {
    if (err) {
      next(err);
      throw err;
    }
    checkPassword(password, user.password, (error: any, isMatch: any) => {
      if (error) {
        throw error;
      }
      if (isMatch) {
        //  setup login json token with jwt. Expires in 1 day.
        const token = jwt.sign({data: user}, environment.databaseSecret, {expiresIn: 86400});
        res.json({
          success: true,
          user: {
            id: user._id,
            username: user.username
          },
          token: 'JWT ' + token
        });
      } else {
        // If username or password are incorrect, return error message.
        return res.json({success: false, msg: 'Invalid username or password'});
      }
    });
  });
});

// User Update
userRoutes.put('/update/:id', updateUser);
