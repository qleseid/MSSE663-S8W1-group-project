import { User } from '../models/user';
import bcrypt = require('bcryptjs');

export const getUser = (username: boolean, queryString: string, callback: any) => {
  if (username) {
    const query = { username: queryString};
    User.findOne(query, callback);
  } else {
    User.findById(queryString, callback);
  }
};

export const getUsers = (req: any, res: any) => {
  User.find({}, (err: any, data: any) => {
    if (err) {
      res.send(err);
    }
    res.json(data);
  });
};

export const createUser = (user: any, callback: any) => {
  bcrypt.hash(user.password, 10, (err: any, hash: any) => {
    if (err) {
      throw err;
    }
    user.password = hash;
    user.save(callback);
  });
};

export const updateUser = (req: any, res: any, next: any) => {
  User.findOneAndUpdate(
    {_id: req.params.id},
    req.body,
    (error: any, data: any) => {
      if (error) {
        console.log(error + ' for data ' + data);
        return next(error);
      } else {
        res.status(200).json({success: true, msg: 'User has been updated!'});
      }
    });
};

export const checkPassword = (password: any, hash: any, callback: any) => {
  bcrypt.compare(password, hash, (err: any, isMatch: any) => {
    if (err) { throw err; }
    callback(null, isMatch);
  });
};

export const logout = (password: any, hash: any, callback: any) => {
  bcrypt.compare(password, hash, (err: any, isMatch: any) => {
    if (err) { throw err; }
    callback(null, isMatch);
  });
};
