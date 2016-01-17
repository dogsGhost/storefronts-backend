'use strict';
// packages
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const config = require('./config');

// routes
const index = require('./routes/index');
const login = require('./routes/login');
const entry = require('./routes/entry');
// NOTE: FOR DEV ONLY
// const setup = require('./routes/_setup');

const app = express();
const PORT = process.env.PORT || 3000;


// connect to db
mongoose.connect(config.database);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('connected to mongodb via mongoose');
});

app.use('/public', express.static(`${__dirname}/public`));
app.set('view engine', 'jade');
app.set('views', `${__dirname}/views`);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(logger('dev'));

// ROUTES
app.use('/', index);
app.use('/login', login);

// NOTE: FOR DEV ONLY
// app.use('/setup', setup);

app.use('/add', entry);

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
})
