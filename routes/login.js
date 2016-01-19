'use strict';
const express = require('express');
const router = express.Router();
const validation = require('./../lib/validation');
const utils = require('./../lib/utils');
const User = require('../models/user');

router.route('/')
  .get(
    (req, res, next) => {
      if (req.session.user) {
        redirect('/admin');
      } else {
        res.render('login', { pageName: utils.getPageTitle(req.baseUrl) });
      }
    }
  )
  .post(
    validation,
    (req, res, next) => {
      // check the user
      User.authenticate(req.body.username, req.body.password, function (err, user) {
        if (err) return console.log(err);
        if (user) {
          // create session for valid user
          req.session.regenerate(function () {
            req.session.user = { name: user.name, id: user._id.toString() };
            res.redirect('/admin');
          });
        } else {
          req.session.error = 'Invalid username/password combination';
          res.redirect('back');
        }
      });
    }
  );

module.exports = router;
