var express = require('express')
 ,	mongoose = require('mongoose')
 ,	routes = require('./router/index')


var app = express ();
app.use(express.static(__dirname + '/public'));
mongoose.connect ('mongodb://localhost', function (err) {
 	if(err) throw err;
 	console.log('Coneccted!');
 	routes(app);
 	app.listen(3000,function (req, res) {
 		console.log('Now listening on http://localhost:3000');
 	});
});
