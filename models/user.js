var db = appRequire('utils/db'),
device = require('./device'),
mongoose = require('mongoose');

var deviceModel = device.model;

var userSchema = mongoose.Schema({
	_id: { 
      type: String,
      unique: true,
      required: true
    },

  firstName:{
    type: String,
    required: true
  },

  lastName:{
    type: String,
    required: true
  },

  password: { 
    type: String, 
    required: true
  },

  devices: {
    type: [{type: String, ref: 'Device', unique: true}]
  }
});

userSchema.virtual('username').get(function(){
  return this._id;
});

userSchema.statics = {
  getUser: function(username, callback){
    this.findById(username, callback);
  },
  getDevices: function(username, callback){
    this.findById(username, function(err, user){
      callback(err, user);
    });
  }
}

module.exports = db.model('User', userSchema);