'use strict';
const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res, next) => {
    res.render('entry', { bundleName: req.baseUrl.split('/')[1] });
  })
  .post((req, res, next) => {
    console.log('req body is ', req.body);
  });

module.exports = router;


/*

mongoose by default uses a collection that is a pluralization of the model name
you can get around this by explicitly setting the the collection name when
you create a new instance of a model.
Example:
var schema = new Schema({ name: String }, { collection: 'actor' });

// or

schema.set('collection', 'actor');

// or

var collectionName = 'actor'
var M = mongoose.model('Actor', schema, collectionName)

 */
