
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
		var tpl 		= $('#tpl').html();
		var contacts 	= [];

		for(var i = 0; i < mockData.length; i++){
			var ident 		= mockData[i];
			var compiled 	= Handlebars.compile(tpl);
			var html 		= compiled(ident);

			contacts.push(html);
		}

		$('#canvas').html(contacts);
	}
};

//export module
module.exports = Mock;