
window.$ 			= require('jquery');
// reuire handle bars here because browserify duh.
window.Handlebars 	= require('handlebars');

//require mock module globally for use
window.mock = require('./mock');

mock.init();