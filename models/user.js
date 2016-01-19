'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const userSchema = Schema({
  name: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true,
  },

  email: String
});

userSchema.statics.authenticate = function (name, password, cb) {
  this.where({ name: name }).findOne((err, user) => {
    if (err) return cb(err);
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        cb(null, user);
        return;
      }
    }
    // no user match or no password match
    cb();
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
