const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const holidayModel = new mongoose.Schema({
  firstName: String,
  lastName: String,
  startDate: Date,
  endDate: Date,
  notes: String
});

module.exports = mongoose.model('Holiday', holidayModel);