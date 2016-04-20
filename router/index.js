// var errors = require ('./errors.js')
var login = require ('./login');
var middleware = require('../middleware/index');

module.exports = function(app)
{
	middleware(app);
	app.get('/', function(req, res) {
		res.render('home.jade');
	});

	login(app);
	// errors(app);
}
