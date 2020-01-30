import mongoose = require('mongoose');
import bcrypt = require('bcryptjs');
import jwt = require('jsonwebtoken');

import { databaseSecret } from '../environment';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.pre('save', async function(next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({_id: user._id}, databaseSecret);
  user.tokens = user.tokens.concat({token});
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (username: string, password: string) => {
  // Search for a user by username and password.
  const user = await User.findOne({ username} );
  if (!user) {
    throw new Error('Invalid login credentials');
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid login credentials');
  }
  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
