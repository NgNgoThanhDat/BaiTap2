var express = require('express'),
	cookieParser = require('cookie-parser');
	var session = require('express-session');
	var bodyParser = require('body-parser')


module.exports = function(app)
{
 	app.use(cookieParser());

 	app.use(session ({
		secret: 'building a blog',
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
