import {model, Schema} from 'mongoose';

export interface UserModel {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  tokens: [];
}

// User Schema
export const UserSchema = new Schema<UserModel>({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
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

export const User = model('User', UserSchema);
