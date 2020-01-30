import mongoose = require('mongoose');
import express = require('express');
import path = require('path');
import bodyParser = require('body-parser');
import cors = require('cors');

import { databaseName } from './environment';
// import { user2Routes } from './routes/user2';
const user2Routes = require('./routes/user2');

const app = express();

// Set port number
const port = process.env.PORT || 3000;

// Connecting to database
mongoose.connect(databaseName, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

// If there is a connection error with db
db.on('error', console.error.bind(console, 'connection error:'));

// If DB is opened successfully
db.once('open', () => {
  console.log('Connection Successful!');
});

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

app.use('/users', user2Routes);

// Start Server
app.listen(port, () => {
  console.log('Server started and listening on port ' + port);
});
