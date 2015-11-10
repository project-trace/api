//add appRequire function to global scope"
require('./app_require');

//loads .env file for ENVIRONMENT VARIABLES
require('dotenv').load();

var path = require('path'),
express = require('express'),
bodyParser = require('body-parser'),
morgan = require('morgan');

//initialize app
var app = module.exports = express();

//add middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));