var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema ({
	name: String,
	friendName: String,
	trangthai: Number
})

module.exports = mongoose.model('friends', UserSchema);
