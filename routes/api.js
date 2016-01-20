'use strict';
const express = require('express');
const Business = require('./../models/business');
const Category = require('./../models/category');
const Street = require('./../models/street');
const router = express.Router();

const api = {
  fectch(modelName, cb) {

    if (err) cb(err);
    if (results) cb(null, results);
    cb();
  }
};

function dev() {
  // NOTE: pseudo code
  // fetch queries a mongo collection via mongoose model
  // gets all results from the collection and returns them
  api.fetch(models[collections.indexOf(collection)], function (err, results) {
    if (err) res.status(503).send(err);
    if (results) res.json(results);
    res.status(503).send('something broke');
  });
}

router.route('/').get((req, res) => {
  res.json({stores: [], streets: [], categories: []});
});

router.route('/:collection/:streetName?')
  .get((req, res) => {
    let collection = req.params.collection;
    let collections = ['stores', 'streets', 'categories'];
    let models = ['Business', 'Street', 'Category'];

    // If the url is unexpected
    if (collections.indexOf(collection) < 0) return res.status(404).send(404);

    // if they want to view all the stores for a specific street
    if (collection === collections[0] && req.params.streetName) {
      // should be able to pass extra param to api.fetch that lets us
      // filter query by a prop value
      res.send('<pre>TODO: implement /stores/'+(req.params.streetName)+' API</pre>');
      return;
    }

    // error if looking for child of collection besides stores
    if (collection !== collections[0] && req.params.streetName) {
      res.status(404).send(404);
      return;
    }

    // If its the correct url
    res.send('<pre>TODO: implement '+(collection + ' ' || 'the ')+'API</pre>');
  })
  .post((req, res) => {
    // TODO
    res.json({ message: 'TODO: set up POST response' });
  });

module.exports = router;
