var friends = require('../models/friends'),
    User = require('../models/Users'),
    loggedIn = require('../middleware/LoggedIn');
    StoreEmail = require('../models/Email');

    
module.exports = function(app) {


    app.get('/createEmail',loggedIn, function (req, res) {
        var name = req.session.user;
        friends.find({name: name}, function (err, listFriend) {
            res.render('createEmail.jade',{listFriend: listFriend});
        })
    });


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
      res.status(200).json({status:"ok"})
    });

    app.put('/', function(req, res) {
        if (req.body.ThongBao === "update")
        {
            StoreEmail.findOne({_id: req.body.id}, function (err, results){
            results.trangthai = "1";
            results.thoigiandoc = req.body.date;
            results.save();
          });
          res.status(200).json({status:"ok"})
        }
    });

    app.get('/sent', function (req, res) {
        var NguoiGui = req.session.user;
        StoreEmail.find({nguoigui: NguoiGui}, function (err, results) {
            res.render('sended.jade', {results: results});
        })
    });
}
