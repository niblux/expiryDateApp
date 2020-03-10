const express = require('express');
const os = require('os');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const FoodtypeController = require('./controllers/FoodtypeController');
var cors = require('cors');


const app = express();

app.use(cors());
app.use(express.static('dist'));
app.get('/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, keepAlive: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});
mongoose.connection.once('open', () => {
  console.log('Mongo Connected!');
});

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug'); 

require('./models/foodtype');

// TODO: Place routes here for now
app.get('/items', FoodtypeController.items);

app.post('/create', FoodtypeController.create);

app.put('/update/:id', FoodtypeController.update);

app.delete('/delete/:id', FoodtypeController.delete);
