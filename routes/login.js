'use strict';

var User = require('../models/user');

exports.form = (req, res) => {
  res.render('login', { title: 'Log In' });
};

exports.submit = (req, res, next) => {
  let data = req.body.user;

  User.authenticate(data.name, data.pass, (err, user) => {
    if (err) return next(err);

    if (user) {
      req.session.uid = user.id;
      res.redirect('/');

    } else {
      res.error('Invalid username/password combination.');
      res.redirect('back');
    }
  });
};

exports.logout = (req, res) => {

};