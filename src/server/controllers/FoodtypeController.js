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
  // mongoose.set('useFindAndModify', false);
  // 1. find the id we want to update
  // console.log('test params id', req.params.id);
  // console.log('test request body', req.body);

  let doc = await FoodType.findOneAndUpdate(req.params.id, req.body);

  console.log('SAVED', doc);

  // Holiday.findOneAndUpdate(req.params.id, req.body, (err) => {
  //   if (err) { console.log('Error saving model'); return err; }
  //   res.json(req.params);
  //   console.log('>>> UPDATED', );
  // }, { new: false });
}

// businessRoutes.route('/update/:id').post(function (req, res) {
//   Business.findById(req.params.id, function(err, business) {
//   if (!business)
//     res.status(404).send("data is not found");
//   else {
//       business.person_name = req.body.person_name;
//       business.business_name = req.body.business_name;
//       business.business_gst_number = req.body.business_gst_number;

//       business.save().then(business => {
//         res.json('Update complete');
//     })
//     .catch(err => {
//           res.status(400).send("unable to update the database");
//     });
//   }
// });
// });

