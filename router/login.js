var mongoose = require('mongoose')
 , 	User = require ('../models/Users')

 module.exports = function (app) {

   	app.get('/signup',  function (req, res) {
   		res.render('signup.jade');
   	});

    // xử lý đăng ký
    app.post('/signup', function (req, res, next) {
      var email = req.body.email1
       ,  pass = req.body.pass
       ,  name = req.body.name;

       // Email hoặc pass hoặc name chưa được nhập
       if (!(email && pass && name)) {
         return invalid();
       }

       // Kiểm tra email có bị trùng không.
       User.findOne({email: email}, function (err, user) {

           if(err) return next(err);

           if(user) {
             return res.render('signup.jade',{exists: true});
           }

           var newUser = new User ( {
             name: name,
             email: email,
             password: pass
           });


           User.create(newUser, function (err, NewUser) {
             if (err) return handleError(err);
           })

           console.log("+ Dang ky thanh cong: ", newUser)
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

    // Xử lý đăng nhập
    app.post('/login', function(req, res, next) {
      var email = req.body.email1,
          pass = req.body.pass

          if (!(email && pass)) {
            return invalid();
          }

          User.findOne({email: email, password: pass}, function (err, user) {
            if (err) return next(err);

            if(!user) {
              return res.render('login.jade',{noexists: true});
            }

            if (user.password != pass) {
              return invalid();
            }
            console.log("+ Dang nhap thanh cong: ", user);
            req.session.isLoggedIn = true;
            req.session.user = user.name;
            req.session.email = email;
            res.redirect('/');
          })

          function invalid() {
            return res.render('login.jade', {invalid: true});
          }
    })

    // Đăng xuất.
    app.get('/logout', function(req, res) {
      if (req.session.isLoggedIn == true)
      {
        req.session.isLoggedIn = false;
        res.redirect('/');
      }
    })
}
