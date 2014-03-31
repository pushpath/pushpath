var DashboardController = (function(){
	function DashboardController($scope) {
		$scope.message = 'controller here';
	}

	DashboardController.$inject = ['$scope'];
	return DashboardController;
})();

exports.DashboardController = DashboardController;