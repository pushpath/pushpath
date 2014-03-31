'use strict'

require('angular/angular');
require('angular-route/angular-route');
require('./modules/dashboard/_module');

var app = angular.module('Pushpath', [
	'ngRoute',
	'Pushpath.Dashboard'
]);

app.config(['$routeProvider', '$httpProvider',
	function($routeProvider, $httpProvider){
		$routeProvider
			.when('/view1', {
				templateUrl: 'modules/dashboard/dashboard-view.html',
				controller: 'DashboardController'});
	}
]);

