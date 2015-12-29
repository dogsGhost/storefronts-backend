'use strict';

exports.form = (req, res) => {
  res.render('entry', { title: 'Add New Business' });
};

exports.submit = (req, res, next) => {
  
};
