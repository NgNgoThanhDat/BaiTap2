var errors = require ('./errors.js')
    login = require ('./login'),
    middleware = require('../middleware/index'),
    home = require('./home'),
    friend = require('./friend'),
    Email = require('./Email');


module.exports = function(app)
{
	middleware(app);
  home(app);
	login(app);
  friend(app);
  Email(app);
	errors(app);
}
