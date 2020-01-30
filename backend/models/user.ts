import {model, Schema} from 'mongoose';

interface User {
  id: number;
  username: string;
  password: string;
  token: string;
}

// User Schema
const UserSchema = new Schema<User> ({
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
});

export const User  =  model('User', UserSchema);
