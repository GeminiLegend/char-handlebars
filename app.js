var express = require('express');
var app = express();
var Charlatan = require('charlatan');

var bodyParser     	= require('body-parser');
var methodOverride 	= require('method-override');

var port 			= process.env.PORT || 5000; 


//Middleware
// required to use req data with objec syntax
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride('X-HTTP-Method-Override')); 

// first argument is the route from where you specified in npm init
app.route('/')
	.get(function(req, res){
		res.sendFile(__dirname + '/public/index.html');
	})
	.post(function(req, res){
		var mockData = '';
		var data = req.body.mockData;

		//eval runs string as js
		mockData = eval(data);
		res.send(mockData);
	});

//http not https
// alternate syntax w no callback
var port = 5000;
app.listen(port);
console.log('listening on port : ' + port);
