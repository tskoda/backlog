//
var mongoose = require('mongoose');

//
var schema = mongoose.Schema({
	id: Number,
	project: Number,
	name: String,
	story: String,
	status: String,
	value: Number,
	size: Number
});

//
module.exports = mongoose.model('Feature', schema);
