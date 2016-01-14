'use strict';

const low = require('lowdb');
const storage = require('lowdb/file-sync');
const db = low('db.json', { storage });

db._.mixin(require('underscore-db'));

let entry = (data) => {
  let address = data.address;
  let occupied = data.occupied;
  let obj = {
    address,
    occupied
  };

  db('entries').insert(obj).id;
  return true;
}

module.exports = entry;