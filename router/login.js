var mongoose = require('mongoose')
 , 	User = require ('../models/user')
 ,  StoreEmail = require('../models/Email')
 , loggedIn = require('../middleware/loggedIn')
 , friends = require('../models/friends');

 module.exports = function (app) {


 	app.get('/signup',  function (req, res) {
 		res.render('signup.jade');
 	});

  app.post('/signup', function (req, res, next) {
    var email = req.body.email1
     ,  pass = req.body.pass
     ,  name = req.body.name;
     if (!(email && pass)) {
       return invalid();
     }
     // kiem tra ten dn va email co bi trung khong
     User.findOne({name: name, email: email}, function (err, user) {
       if(err) return next(err);

       if(user) {
         return res.render('signup.jade',{exists: true});
       }

       var user_1 = new User ( {
         name: name,
         email: email,
         password: pass
       });

       User.create(user_1, function (err, newUser) {
         if (err) {
           if (err instanceof mongoose.Error.ValidationError) {
            return invalid();
          }
          return next(err);
         }
       })
       req.session.isLoggedIn = true;
       req.session.user = name;
       req.session.email = email;
       return res.redirect('/');
     })
     function invalid() {
       return res.render('signup.jade', {invalid: true});
     }
  });


  app.get('/login', function(req, res) {
    res.render('login.jade');
  })

  app.post('/login', function(req, res, next) {
    var email = req.body.email1,
        pass = req.body.pass

        if (!(email && pass)) {
          return invalid();
        }

        User.findOne({email: email, password: pass}, function (err, user) {
          if (err) return next(err);

          if(!user) {
            return invalid();
          }

          if (user.password != pass) {
            return invalid();
          }
          req.session.isLoggedIn = true;
          req.session.user = user.name;
          req.session.email = email;
          res.redirect('/');
        })

        function invalid() {
          return res.render('login.jade', {invalid: true});
        }
  })

  app.get('/logout', function(req, res) {
    if (req.session.isLoggedIn == true)
    {
      req.session.isLoggedIn = false;
      res.redirect('/');
    }
  })


  app.get('/createEmail', function (req, res) {
    var name = req.session.user;
    friends.find({name: name}).sort('name').limit(100).exec(function (err, listFriend) {
        res.render('sendEmail.jade',{listFriend: listFriend});
    })
  });

  app.get('/showFriends',   function(req, res) {
    var name = req.session.user;
    friends.find({name: name}).sort('name').limit(100).exec(function (err, listFiend)
    {
        User.find().sort('name').limit(100).exec(function (err, listUser) {
            if (err) return next(err);
            res.render('friends.jade',{listUser: listUser, listFiend: listFiend});
          })
      });

    });

    app.post('/showFriends', function (req, res) {

      if (req.body.ThongBao == "BlockFriend")
      {
        friends.findOne({_id: req.body.id}, function (err, results){
          results.trangthai = 0;
          results.save();
        });
      }
      else
        if (req.body.ThongBao == "UnBlockFriend")
        {
          friends.findOne({_id: req.body.id}, function (err, results){
            results.trangthai = 1;
            results.save();
          });
        }
        else
          if (req.body.ThongBao == "AddFriend")
          {
              var id = req.body.id;
              User.findOne({_id: id}, function(err, results) {
                var user = new friends ( {
                  name: req.session.user,
                  friendName: results.name,
                  trangthai: 1
                });

                friends.create(user, function (err, newUser) {
                    if (err) {
                      if (err instanceof mongoose.Error.ValidationError) {
                       return invalid();
                     }
                     return next(err);
                    }
                  })
                })
            }
          else {
              if (req.body.ThongBao == "DeleteFriend")
              {
                  var id = req.body.id;
                  friends.find({_id: id}).remove().exec()
                  res.header("Access-Control-Allow-Origin", "*");
                  res.header("Access-Control-Allow-Headers", "X-Requested-With");
                  res.send(200, JSON.stringify("done"));
                }
          }
    })



    app.post('/sendEmail', function (req, res) {
      var dsNguoiNhan = req.body.tempFriend;
      var NoiDung = req.body.NoiDung;
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();
      today = dd+'/'+mm+'/'+yyyy;
      var i = 0;
      for ( i = 0; i< dsNguoiNhan.length; i++) {
        var strEmail = new StoreEmail ({
          nguoigui: req.session.user,
          nguoinhan: dsNguoiNhan[i],
          ngay: today,
          noidung: NoiDung,
          trangthai: "0",
          thoigiandoc: ""
        });
        StoreEmail.create(strEmail, function (err, newUser) {
          if (err) {
            if (err instanceof mongoose.Error.ValidationError) {
             return invalid();
           }
           return next(err);
          }

        })
      }
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.send(200, JSON.stringify("done"));
    })

    app.post('/', function(req, res) {
      if (req.body.ThongBao === "update")
      {
          StoreEmail.findOne({_id: req.body.id}, function (err, results){
          results.trangthai = "1";
          results.thoigiandoc = req.body.date;
          results.save();
        });
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.send(200, JSON.stringify("done"));
      }
    })

    app.get('/sent', function (req, res) {
      var NguoiGui = req.session.user;
      StoreEmail.find({nguoigui: NguoiGui}, function (err, results) {
          res.render('sent.jade', {results: results});
      })
    })


 }
