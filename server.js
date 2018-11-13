const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');


//API ROUTES
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');


//EXPRESS MIDDLEWARE
const app = express();

//BODYPARSER MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//PASSPORT MIDDLEWARE
app.use(passport.initialize());

//PASSPORT CONFIGURATION
require('./config/passport')(passport)


//ROUTE USAGE
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/profile', profile);


//MONGOOSE MIDDLEWARE INITIALIZATION
const db = require('./config/keys').mongoURI;

//CONNECT TO MONGODB
mongoose
  .connect(db, { useNewUrlParser: true})
  .then(() => console.log('CONNECTED TO MONGODB'))
  .catch(error => console.log(error))

  //TEST KO LANG
app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(process.env.PORT || 5000);

