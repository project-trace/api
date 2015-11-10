require('dotenv').load();

var mongoose = require('mongoose');

module.exports = function() {
  var db = mongoose.connect('mongodb://' + process.env.DB_URL);
  return db;
}();