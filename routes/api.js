'use strict';
const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.send('<pre>TODO: implement API</pre>');
  });

module.exports = router;
