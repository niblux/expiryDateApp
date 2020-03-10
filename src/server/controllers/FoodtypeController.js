const mongoose = require('mongoose');
require('../models/foodtype');
const FoodType = mongoose.model('FoodType');

exports.myMiddleware = (req, res, next) => {
  if (req.params.name.length > 4) {
    next();
  } else {
    res.send('You shall not pass');
  }
};

exports.items = (req, res) => {
  FoodType.find({}, function (err, items) {
    if (!err) {
      res.send(JSON.stringify(items));
    } else { throw err; }
  });
};

exports.create = async (req, res) => {
  const foodType = new FoodType(req.body);
  await foodType.save(function (err) {
    if (err) { console.log('Error saving model'); return err; }
    console.log('saved');
  });
  res.json(req.params);
  console.log('POSTING', req.body);
};

exports.delete = async (req, res) => {
  console.log('id', req.params)
  FoodType.findByIdAndRemove(req.params.id, (err) => {
    if (err) { console.log('Error saving model'); return err; }
  });
  res.json(req.params);
};

exports.update = async (req, res) => {
  mongoose.set('useFindAndModify', false);
  let itemToUpdate = {};

  // find the id i want to update
  if(req.body.length > 1) {
    itemToUpdate = req.body.find(r => r._id === req.params.id);
  } 

  let doc = await FoodType.findOneAndUpdate(itemToUpdate.id, itemToUpdate);
}


