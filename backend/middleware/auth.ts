import jwt = require('jsonwebtoken');

import {databaseSecret} from '../environment';
import User = require('../models/user2');

const auth = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  const data = jwt.verify(token, databaseSecret);
  try {
    const user = await User.findOne({_id: data._id, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({error: 'Not authorized to access this resources.'});
  }
};

module.exports = auth;
