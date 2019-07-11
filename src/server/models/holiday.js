const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const holidayModel = new mongoose.Schema({
  name: String,
  foodType: String,
  purchase: Date,
  expiryDate: Date,
  notes: String
});

module.exports = mongoose.model('Holiday', holidayModel);