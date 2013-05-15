//
var mongoose = require('mongoose');

//
var schema = mongoose.Schema({
	_id: Number,
	name: String,
	description: String,
	status: String,

	customer: {
		name: String,
		stakeholders: [{
			_id: Number,
			name: String,
			email: String
		}]
	},
	
	team: {
		scrumMaster: {
			name: String,
			email: String
		},
		members: [{
			_id: Number,
			name: String,
			email: String
		}]
	},

	value: Number,
	size: Number,
	story: String 
});

//
module.exports = mongoose.model('Project', schema);