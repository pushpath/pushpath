/// <reference path="libs.d.ts" />

'use strict'

require('angular/angular');
require('angular-route/angular-route');
require('../bower_components/angular-mocks/angular-mocks');
require('./modules/dashboard/_module');
require('./modules/settings/_module');
require('./modules/project/_module');

var appE2E = angular.module('appE2E', ['ngMockE2E'])
    .run(function($httpBackend){
        $httpBackend.whenGET('/api/').respond(
            {message: 'success'}
        );
        $httpBackend.whenPOST('/api/').respond(
            {message: 'success'}
        );

        $httpBackend.whenGET(/^\w+.*/).passThrough();
        $httpBackend.whenPOST(/^\w+.*/).passThrough();
    });

var app = angular.module('Pushpath', [
	'ngRoute',
	'Pushpath.Dashboard',
	'Pushpath.Settings',
	'Pushpath.Project',
    'appE2E'
]);

app.config(['$httpProvider','$routeProvider',
	function($httpProvider, $routeProvider){
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
