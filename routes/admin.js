'use strict';
const express = require('express');
const router = express.Router();
const utils = require('./../lib/utils');

router.route('/')
  .get(
    // make sure user is logged in
    (req, res, next) => {
      if (req.session.user) {
        next();
      } else {
        res.redirect('/login');
      }
    },

    (req, res, next) => {
      var token = true;
      if (token) {
        res.render('admin', { pageName: utils.getPageTitle(req.baseUrl) });
      } else {
        res.redirect('/login');
      }
    }
  );

module.exports = router;
