const mongoose = require('mongoose');
require('../models/holiday');
const Holiday = mongoose.model('Holiday');

exports.myMiddleware = (req, res, next) => {
  if (req.params.name.length > 4) {
    next();
  } else {
    res.send('You shall not pass');
  }
};

exports.home = (req, res) => {
  res.send('Home Page');
};

exports.testPage = (req, res) => {
  res.render('index');
};

exports.withParams = (req, res) => {
  res.json(req.params);
};

exports.create = async (req, res) => {
  const holiday = new Holiday(req.body);
  // so your saying await , to say await until i do this action with Await in front before u carry on 
  await holiday.save(function(err) {
    if (err) { console.log('Error saving model'); return err }
    console.log('saved');
  });
  res.json(req.params);
  console.log(req.body);
};

exports.showForm = (req, res) => {
  const results =  Holiday.find();
  res.json(res);
  console.log('showform', results);
};
