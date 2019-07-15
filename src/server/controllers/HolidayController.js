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

exports.items = (req, res) => {
  Holiday.find({}, function (err, items) {
    if (!err) {
      console.log(items);
      res.send(JSON.stringify(items));
    } else { throw err; }
  });
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
  // not nessacrily , basically the await returns a promise from an asynchrounous fucntion
  await holiday.save(function (err) {
    if (err) { console.log('Error saving model'); return err; }
    console.log('saved');
  });
  res.json(req.params);
  console.log('POSTING', req.body);
};

exports.showForm = async (req, res) => {

  // 1. Display data in a table (so it's easier to edit);

  // 2. Create click event on frontend to capture id when editing

  const results = await Holiday.find({});
  res.send(results);
  console.log('showform', results);
};

exports.updateRecord = async (req, res) => {

  // 1. find the id we want to update
  console.log('test params', req.params);

  const record = await Holiday.findById({ _id: req.params.id }, function (err) {
    console.log(res.body);
  });

  res.send(record);

  // 2. Update that record


  // 3. Return the corrected result.
}

