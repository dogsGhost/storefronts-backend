'use strict';
const validator = require('./../lib/validator');
const validation = function (req, res, next) {
  let values = [];
  for (let key in req.body) {
    values.push(req.body[key]);
  }
  // if the values are valid
  var valCheck = validator(values);

  if (valCheck.isValid) {
    next();
  } else {
    res.redirect('back');
    return;
  }
};

module.exports = validation;
