/*
  Welcome! This is the entry point to the houserentportal-api
*/

//Dependencies used in the api
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

//Router Path for Profiles
const profileRouter = require('./profile');
//const userRouter = require('./user');

//Body parser which renders JSON formatted responses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS setup
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/index', async(req, res) =>{
    await res.status(200).json("Index!")
})

//User Route Endpoint Navigation
app.use('/api/v1/profile', profileRouter);
//app.use('/api/v1/user', userRouter);

//Database Configuration
const mongoose = require("mongoose");
//const url = "mongodb://localhost:27017/enterpair-api";

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect( process.env.MONGOLAB , {
    keepAlive: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
      console.log("Successfully connected to the database");
  }).catch(err => {
      console.log('Could not connect to the database. Exiting now...');
      console.log(err)
      process.exit();
  });

//Error Handling set up
app.use((req, res, next) => {
  const error = new Error('404 Page Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

//Server COnfiguration
const port = 5000;  
app.listen(process.env.PORT, () => console.log(`App running on port ${port}!`))

module.exports = app;
