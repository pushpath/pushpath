var DashboardDirective = (function(){
	function DashboardDirective() {
		return {
			scope: {},
			replace: true,
			templateUrl: 'modules/dashboard/dashboard-directive.html',
			link: function($scope) {
				console.log('hello directive!!!');
			}
		}
	}

	return DashboardDirective;

})();

exports.DashboardDirective = DashboardDirective;