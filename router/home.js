var Email = require('../models/Email'),
    Friends = require('../models/friends')


module.exports = function (app) {
    app.get('/', function(req, res) {
        if (req.session.isLoggedIn == true)
        {
          var nguoinhan = req.session.user;
          Email.find({nguoinhan: nguoinhan}, function (err, listEmail) {
            Friends.find({name: nguoinhan}, function(err, listFriend)  {
              res.render('home.jade', {listEmail: listEmail, listFriend: listFriend});
            });
          });
        }
        else
          res.render('home.jade');
    });
};
