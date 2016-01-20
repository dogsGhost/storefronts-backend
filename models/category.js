'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

categorySchema.set('toJSON', { versionKey: false });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
