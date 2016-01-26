'use strict';
// packages
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const logger = require('morgan');
const config = require('./config');

// routes
const index = require('./routes/index');
const login = require('./routes/login');
const admin = require('./routes/admin');
const api = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// connect to db
mongoose.connect(config.database);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('connected to mongodb via mongoose');
});

// config
app.set('view engine', 'jade');
app.set('views', `${__dirname}/views`);

// middleware
app.use('/public', express.static(`${__dirname}/public`));
app.use('/lib', express.static(`${__dirname}/lib`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(logger('dev'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: config.secret,
  store: new MongoStore({ mongooseConnection: db })
}));

app.use((req, res, next) => {
  if (req.session.user) {
    res.locals.username = req.session.user.name;
  }
  next();
});

// set routes
app.use('/', index);
app.use('/login', login);
app.get('/logout', (req, res) => {
  // destroy session to effectively logout user
  req.session.destroy(() => {
    res.redirect('/');
  });
});
app.use('/admin', admin);
app.use('/api', api);

// start the app
app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`running on port ${PORT}`);
})
