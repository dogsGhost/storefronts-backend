'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const businessSchema = new Schema({
  address: {
    type: Number,
    required: true
  },

  isOccupied: {
    type: Boolean,
    required: true
  },

  occupantName: String,

  street: {
    type: Schema.Types.ObjectId,
    ref: 'Street',
    required: true
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },

  notes: String
}, { collection: 'stores'});

businessSchema.set('toJSON', { versionKey: false });

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
