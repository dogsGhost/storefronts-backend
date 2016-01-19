'use strict';
var validator = function (values) {
  var isValid = true;

  for (var i = 0, len = values.length; i < len; i++) {
    if (/ +|\/+|<+|"+|'+/.test(values[i])) {
      isValid = false;
    }
  }

  return {
    isValid: isValid,
    errorMsg: 'Invalid username/password combination'
  };
};

if (typeof module === 'object' && typeof module.exports === 'object') {
  module.exports = validator;
}
