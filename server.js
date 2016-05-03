var express = require('express')
 ,	mongoose = require('mongoose')
 ,	routes = require('./router/index')


var app = express ();
var port = Number(process.env.PORT || 3000);

var uristring =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost:27017/';

mongoose.connect (uristring, function (err) {
 	if(err) throw err;
 	console.log('Coneccted!');
 	routes(app);
 	app.listen(port,function (req, res) {
 		console.log('Now listening on http://localhost:3000');
 	});
});
