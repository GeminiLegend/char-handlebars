var express = require('express');
var app = express();
var Charlatan = require('charlatan');

var bodyParser     	= require('body-parser');
var methodOverride 	= require('method-override');

var port 			= process.env.PORT || 5000; 


// Middleware
// required to use req data with objec syntax
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride('X-HTTP-Method-Override'));

// required to serve our bundle from browserify
app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// first argument is the route from where you specified in npm init
app.route('/')
	.get(function(req, res){
		res.sendFile(__dirname + '/public/index.html');
	})
	.post(function(req, res){
		Charlatan.setLocale('en-US');

		function capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}

		function lowercaseFirstLetter(string) {
			return string.charAt(0).toLowerCase() + string.slice(1);
		}

		var mockData 	= [];
		// var iterations 	= req.body.i;
		var iterations 		= req.body.i;
		var data 			= req.body.mockData.split("\n");

		// overall process:
		// 1. loop starts with first iteration
		// 2. creates compiled object
		// 3. begins looping over the data (number of calls to charlatan)
		//		and sets a porperty name for each one
		// 4. adds that property to the compiled obj and sets the value to
		//		the evaluated string at the matching index
		// loops over number of people we want, nested loop
		for(var i = 0; i < iterations; i++){

			var compiled = {};

			// loops over data properties like name and email
			for(var j = 0; j < data.length; j++){

				console.log('item: ' + data[j]);

				var domain 				= data[j].split('.')[1];
				var domain 				= lowercaseFirstLetter(domain);
				var name 				= data[j].split('.')[2].split('();')[0];
				var name 				= capitalizeFirstLetter(name);
				var key 				= domain + name;

				console.log('domain: ' + domain);
				console.log('name: ' + name);
				console.log('key: ' + key);

				compiled[key]  =  eval(data[j]);  //Eval runs string as js
			}

			console.log(compiled);

			// add compiled data to mockData object
			mockData.push(compiled);
		}

		// console.log(mockData);

		res.send(mockData);
	});

// http not https
// alternate syntax w no callback
var port = 5000;
app.listen(port);
console.log('listening on port : ' + port);
