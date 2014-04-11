/// <reference path="libs.d.ts" />

'use strict'

require('angular/angular');
require('angular-route/angular-route');
require('./modules/dashboard/_module');
require('./modules/settings/_module');
require('./modules/project/_module');

var app = angular.module('Pushpath', [
	'ngRoute',
	'Pushpath.Dashboard',
	'Pushpath.Settings',
	'Pushpath.Project'
]);

app.config(['$routeProvider',
	function($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl: 'modules/dashboard/dashboard-view.html',
				controller: 'DashboardController'})
            .when('/settings', {
                templateUrl: 'modules/settings/settings-view.html',
                controller: 'SettingsController'
            })
            .when('/project', {
                templateUrl: 'modules/project/project-view.html',
                controller: 'ProjectController'
            });
	}
]);

