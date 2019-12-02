const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const foodModel = new mongoose.Schema({
  foodName: String,
  foodType: String,
  purchaseDate: Date,
  expiryDate: Date,
  notes: String
});

module.exports = mongoose.model('FoodType', foodModel);