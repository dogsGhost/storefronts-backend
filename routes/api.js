'use strict';
const express = require('express');
const Business = require('./../models/business');
const Category = require('./../models/category');
const Street = require('./../models/street');
const router = express.Router();
// allows us to reference model name from a string
const models = {
  Business,
  Category,
  Street
};

// NOTE: test route
const test = require('./test');

router.route('/').get((req, res) => {
  res.sendStatus(404);
});

// NOTE: TEST ROUTE
router.route('/test')
  .get(test)
  .post((req, res) => {
    res.json({ message: 'you did it' });
  });

router.route('/:collection/:streetName?')
  .get((req, res) => {
    let collection = req.params.collection;
    let streetName = req.params.streetName;
    // collectionName: modelName
    let dbKey = {
      categories: 'Category',
      stores: 'Business',
      streets: 'Street'
    };

    // If the url is unexpected
    if (!dbKey[collection]) return res.sendStatus(404);

    // if they want to view all the stores for a specific street
    if (collection === 'stores' && streetName) {
      // TODO: should be able to pass extra param to api.fetch that lets us
      // filter query by a prop value
      res.send(`<pre>TODO: implement /stores/${streetName} API</pre>`);
      return;
    }

    // error if looking for child of collection besides stores
    if (collection !== 'stores' && streetName) {
      res.sendStatus(404);
      return;
    }

    // If its the correct url query the database
    models[dbKey[collection]].find((err, results) => {
      if (err) return res.send(err);
      if (results) return res.json(results);
      res.sendStatus(500);
    });
  })
  .post((req, res) => {
    // TODO
    res.json({ message: 'TODO: set up POST response' });
  });

module.exports = router;
