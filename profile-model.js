const mongoose = require('mongoose');

// User Schema
const profileSchema = mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String },
	specialty: { type: String },
	experience: { type: String },
	cv: { type: String },
	workAt: { type: String },
	email: { type: String }
});

profileSchema.set('timestamps', true);

module.exports = mongoose.model('User', profileSchema)
