'use strict';

var entry = require('../models/entry');

exports.form = (req, res) => {
  res.render('entry', { title: 'Add New Business' });
};

exports.submit = (req, res, next) => {
  console.log(req.body);
  // let data = req.body.entry;
  // if (entry(data)) {
  //   console.log('we did it!');
  //   res.redirect('/');
  // } else {
  //   console.log('error!');
  //   res.error('Invalid entry.');
  //   res.redirect('back');
  // }
};
