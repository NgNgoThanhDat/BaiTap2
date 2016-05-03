var express = require('express')
 ,	mongoose = require('mongoose')
 ,	routes = require('./router/index')


var app = express ();
var port = Number(process.env.PORT || 3000);

mongoose.connect ('mongodb://localhost', function (err) {
 	if(err) throw err;
 	console.log('Coneccted!');
 	routes(app);
 	app.listen(port,function (req, res) {
 		console.log('Now listening on http://localhost:3000');
 	});
});
