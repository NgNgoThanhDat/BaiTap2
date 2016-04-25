// var errors = require ('./errors.js')
var login = require ('./login');
var middleware = require('../middleware/index');
var GetEmail = require('../models/Email');
var friends = require('../models/friends');
module.exports = function(app)
{
	middleware(app);
	app.get('/', function(req, res) {
		if (req.session.isLoggedIn == true)
		{
			var nguoinhan = req.session.user;
			GetEmail.find({nguoinhan: nguoinhan}).sort('ngay').exec (function (err, listEmail) {
				friends.find({name: nguoinhan}).sort('name').exec(function(err, listFriend)  {
					res.render('home.jade', {listEmail: listEmail, listFriend: listFriend});
				})
			})
		}
		else
			res.render('home.jade');
	});

	login(app);
	// errors(app);
}
