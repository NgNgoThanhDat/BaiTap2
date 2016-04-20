var mongoose = require('mongoose')
 , 	User = require ('../models/user');

 module.exports = function (app) {
 	app.get('/signup',  function (req, res) {
 		res.render('signup.jade');
 	});

  app.post('/signup', function (req, res) {
    res.send("Dang nhap t.c");
  });
  app.get('/login', function(req, res) {
    res.render('login.jade');
  })
 }
