var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// planner schema
var PlannerSchema = new Schema({
	firstname: String,
	lastname: String,
	days_to_bd: Number,
	ages_ny: Number
})

module.exports = mongoose.model('planner', PlannerSchema);