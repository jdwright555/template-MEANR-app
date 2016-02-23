var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// contacts schema
var ContactSchema = new Schema({
	firstname: String,
	lastname: String,
	address: String,
	town: String,
	postcode: String,
	dob: Date
})

module.exports = mongoose.model('contact', ContactSchema);