var express = require('express'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	bodyParser = require('body-parser');


module.exports = function(app)
{
 	app.use(cookieParser());
  app.use(express.static('public'));
 	app.use(session ({
		secret: 'building a app',
		resave: true,
		saveUninitialized: true
	}));
 	app.use(bodyParser.urlencoded({ extended: true}));
	app.use(bodyParser.json());

 	app.use( function (req, res, next) {
 		res.locals.session = req.session;
 		next();
 	})
 }
