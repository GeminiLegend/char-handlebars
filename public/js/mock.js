
// Mock binds events will fetch data
var Mock = {
	init: function() {
		Mock.bindEvents();
	},

	bindEvents: function(){
		$('#mockForm').on('submit', Mock.fetchMockData);
	},

	fetchMockData: function(evt){
		evt.preventDefault();

		var iterations = $('#iterations').val();

		var mockData = $('#mockForm textarea').val();
		var reqData  = { mockData: mockData, i: iterations };

		$.ajax({
			url : 'http://localhost:5000',
			type : "POST",
			data : reqData

		})
		.done( function(res){
			window.res = res;
			Mock.displayData(res);
		});
	},

	displayData: function(mockData){
		$('form').hide();
		// catche the html handlebars will need to compile
		var tpl 		= $('#tpl').html();
		var contacts 	= [];

		for(var i = 0; i < mockData.length; i++){
			// mockData is array with compiled charlatan identities
			var ident 		= mockData[i];
			// compile the template to display the identity
			var compiled 	= Handlebars.compile(tpl);
			// cache the compiled identity
			var html 		= compiled(ident);
			// puch the identity to an array
			contacts.push(html);
		}
		// set the html to the finished product of the loop
		$('#canvas').html(contacts);
	}
};

//export module
module.exports = Mock;