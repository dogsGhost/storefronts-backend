'use strict';

const bcrypt = require('bcrypt');
const low = require('lowdb');
const storage = require('lowdb/file-sync');
const db = low('users.json', { storage });

db._.mixin(require('underscore-db'));

class User {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];  
    }
  };

  static getByName(name, fn) {
    let user = db('users').find({ name });

    if (user) {
      fn(null, new User(user));
    } else {
      fn(null, {});
    }
  };

  static getId(name, fn) {

  };

  static getEntry(id, fn) {

  };

  static authenticate(name, pass, fn) {
    User.getByName(name, (err, user) => {
      if (err) return fn(err);
      if (!user.id) return fn();
      bcrypt.hash(pass, user.salt, (err, hash) => {
        if (hash === user.pass) return fn(null, user);
        fn();
      });
    });
  };
  
  save(fn) {
    // update if user already exists
    if (this.id) {
      this.update();

    } else {
      let user = this;

      user.hashPassword((err) => {
        if (err) throw err;
        user.update();
        console.log('user added');
      });
    }
  };
  
  update() {
    db('users').insert(this).id;  
  };

  hashPassword(fn) {
    let user = this;
    
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return fn(err);
      user.salt = salt;

      bcrypt.hash(user.pass, salt, (err, hash) => {
        if (err) return fn(err);
        user.pass = hash;
        fn();
      });
    });
  };
}

module.exports = User;