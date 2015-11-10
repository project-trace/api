var db = appRequire('utils/db'),
mongoose = require('mongoose');

var deviceSchema = mongoose.Schema({
	_id: { 
      type: String,
      unique: true,
      required: true
    },

	deviceName: { 
		type: String,
		required: true 
	},

	user: {type: String, ref: 'User'},

	alias: {type: String, default: null}
});

deviceSchema.virtual('macAddress').get(function(){
	return this._id;
});

module.exports.schema = deviceSchema;

module.exports.model = db.model('Device', deviceSchema);

