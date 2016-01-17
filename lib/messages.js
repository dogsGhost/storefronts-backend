// store messages in a session variable so they can persist after redirects.
'use strict';

const express = require('express');
const res = express.response;

res.message = function (string, type) {
  type = type || 'info';
  let sess = this.req.session;
  sess.messages = sess.messages || [];
  sess.messages.push({ type, string });
};

res.error = function (msg) {
  return this.message(msg, 'error');
};

module.exports = (req, res, next) => {
  res.locals.messages = req.session.messages || [];
  res.locals.removeMessages = () => {
    req.session.messages = [];
  };
  next();
};