var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema ({
	nguoigui: String,
	nguoinhan: String,
  ngay: String,
  noidung: String,
  trangthai: String,
	thoigiandoc: String
})

module.exports = mongoose.model('Email', UserSchema);
