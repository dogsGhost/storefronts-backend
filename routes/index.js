'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { bundleName: 'home' });
});

module.exports = router;
