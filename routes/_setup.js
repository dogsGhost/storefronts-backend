'use strict';
const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const config = require('./../config');
const router = express.Router();

const User = require('../models/user');

router.route('/')
  .get((req, res, next) => {
    // check if our user has already been created
    let regex = new RegExp(config.name);
    User.find({ name: regex }, (err, result) => {
      if (err) return console.log(err);

      if (!result.length) {
        // if not already created, create user
        let user = new User({
          name: config.name,
          password: bcrypt.hashSync(config.password)
        });

        // save user
        user.save((err, user) => {
          if (err) return console.log(err);
        });

        res.send(user.name);
      } else {
        res.send('user already exists');
      }
    });

  });

module.exports = router;
