'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const streetSchema = Schema({
  name: {
    type: String,
    required: true
  },

  description: String
});

const Street = mongoose.model('Street', streetSchema);

module.exports = Street;
