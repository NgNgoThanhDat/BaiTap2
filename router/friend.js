var friends = require('../models/friends'),
    User = require('../models/Users'),
    loggedIn = require('../middleware/LoggedIn');


module.exports = function (app) {

    app.get('/showFriends', loggedIn,  function(req, res, next) {
    var name = req.session.user;
    friends.find({name: name},function (err, listFiend) {
        User.find({},function (err, listUser) {
            if (err) return next(err);
            res.render('friends.jade',{listUser: listUser, listFiend: listFiend});
          })
      });
    });


    app.put('/showFriends', function(req, res, next) {
      if (req.body.ThongBao == "BlockFriend")
      {
        friends.findOne({_id: req.body.id}, function (err, results){
          if (err) return next(err);
          results.trangthai = 0;
          results.save();
        });
      }
      else
        if (req.body.ThongBao == "UnBlockFriend")
        {
          friends.findOne({_id: req.body.id}, function (err, results){
            if (err) return next(err);
            results.trangthai = 1;
            results.save();
          });
        }
    });

    app.delete('/showFriends', function(req, res, next) {
      if (req.body.ThongBao == "DeleteFriend") {
          var id = req.body.id;
          friends.find({_id: id}).remove().exec();
          res.status(200).json({status:"ok"})
        }
    });

    app.post('/showFriends', function (req, res) {
        if (req.body.ThongBao == "AddFriend") {
            var id = req.body.id;

            User.findOne({_id: id}, function(err, results) {
                var user = new friends ( {
                name: req.session.user,
                friendName: results.name,
                trangthai: 1
              });

              friends.create(user, function (err, newUser) {
                  if (err) {
                     return next(err);
                  }
              })
            })
        }
    })

}
