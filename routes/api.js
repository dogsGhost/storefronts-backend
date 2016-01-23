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
// collectionName: modelName
const dbKey = {
  categories: 'Category',
  stores: 'Business',
  streets: 'Street'
};

// NOTE: test route
const test = require('./test');

router.route('/').get((req, res) => {
  res.sendStatus(404);
});

// NOTE: TEST ROUTE
router.route('/test').get(test);

router.route('/:collection/:streetName?')
  .get((req, res) => {
    let collection = req.params.collection;
    let streetName = req.params.streetName;

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
    const obj = req.body;
    const collection = req.params.collection;
    const model = models[dbKey[collection]];
    // Make an object with the values we need to use to check for duplicates
    const makeTestObj = (srcObj, collectionName) => {
      let newObj = {};
      const testKey = {
        categories: ['name'],
        streets: ['name', 'city', 'state'],
        stores: ['address', 'street']
      };
      testKey[collectionName].forEach((val) => {
        if (srcObj[val]) newObj[val] = srcObj[val];
      });
      return newObj;
    };

    // If the url or request body is unexpected
    if (!dbKey[collection] || typeof obj !== 'object') {
      return res.sendStatus(404);
    }

    model.findOne(makeTestObj(obj, collection), (err, results) => {
      let entry;
      // error with db/mongoose
      if (err) return res.json(err);
      // this means entry already exists
      if (results) return res.json({ message: 'duplicate entry' });
      // we can try to save the entry
      entry = new model(obj);
      // save the sample user
      entry.save(function(err) {
        // If model fails validation
        if (err) return res.json(err);
        // otherwise we've saved it
        res.set('Content-Type', 'application/json');
        res.json({ data: entry });
      });
    });
  });

module.exports = router;
