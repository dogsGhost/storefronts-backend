'use strict';
const express = require('express');
const router = express.Router();

function capt(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

router.route('/')
  .get((req, res, next) => {
    res.render('login', { pageName: capt(req.baseUrl.split('/')[1]) });
  })
  .post((req, res, next) => {
    console.log('req body is ', req.body);
  });

module.exports = router;
