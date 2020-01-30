import express = require('express');
import User = require('../models/user2');
import auth = require('../middleware/auth');

const user2Routes = express.Router();

user2Routes.post('/register', async (req: any, res: any) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({user, token});
  } catch (error) {
    res.status(400).send(error);
  }
});

user2Routes.post('/login', async (req: any, res: any) => {
  // Login a registered user
  try {
    const {username, password} = req.body;
    const user = await User.findByCredentials(username, password);
    if (!user) {
      return res.status(401).send({error: 'Login failed! Check authentication credentials'});
    }
    const token = await user.generateAuthToken();
    res.send({user, token});
  } catch (error) {
    res.status(400).send(error);
  }

});

user2Routes.get('/me', auth, async (req: any, res: any) => {
  res.send(req.user);
});

user2Routes.post('/logout', auth, async (req: any, res: any) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

user2Routes.post('/logoutAll', auth, async (req: any, res: any) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = user2Routes;
