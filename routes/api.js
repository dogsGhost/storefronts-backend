'use strict';
const express = require('express');
const mongoose = require('mongoose');
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

router.route('/').get((req, res) => {
  res.sendStatus(404);
});

router.route('/:collection')
  .get((req, res) => {
    const collection = req.params.collection;
    let query;

    // If the url is unexpected
    if (!dbKey[collection]) return res.sendStatus(404);

    // If its the correct url query the database
    query = models[dbKey[collection]].find();

    // Stores have to have to be populated before being returned
    if (collection === 'stores') query.populate('category street');

    // Return our results as json
    query.exec((err, results) => {
      if (err) return res.send(err);
      if (results) {
        res.set('Content-Type', 'application/json');
        return res.json(results);
      }
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
        stores: ['address']
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

    // stores are a special case
    if (collection === 'stores') {
      // get the stores that match address
      model.find(makeTestObj(obj, collection))
        // same address may exist at different streets
        .populate('street', '_id')
        .exec((err, results) => {
          if (err) return res.json(err);
          // if there are actually results we have to confirm duplicate
          if (results.length) {
            console.log('results: ', results);
            return res.json({ message: 'duplicate entry' });
            // TODO
            // let exists = false;
            // // check if street name matches the one we want to add
            // results.forEach((item) => {
            //   if (item.street.name === obj) exists = true;
            // });
          }

          let entry = {
            address: obj.address,
            isOccupied: obj.isOccupied,
            street: obj.street
          };

          // Add optional properties
          if (obj.category) entry.category = obj.category;
          if (obj.notes) entry.notes = obj.notes;
          if (obj.occupantName) entry.occupantName = obj.occupantName;

          let business = new Business(entry);
          business.save(function(err) {
            // If model fails validation
            if (err) {
              console.log(err);
              return res.json(err);
            }
            // otherwise we've saved it
            return res.set('Content-Type', 'application/json')
              .json({data: business});
          });
        });
      return;
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
        res.set('Content-Type', 'application/json').json({ data: entry });
      });
    });
  });

module.exports = router;
