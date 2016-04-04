
// Mock binds events will fetch data
var Mock = {
	init: function() {
		Mock.bindEvents();
	},

	bindEvents: function(){
		$('#mockForm').on('submit', Mock.fetchMockData);
	},

	fetchMockData: function(){
		debugger;
	}
};

//export module
module.exports = Mock;