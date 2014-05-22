/// <reference path="../../libs.d.ts" />

export interface Scope extends ng.IScope {
    message: string;

    test: () => void;
}

export var DashboardDirective = function($http: ng.IHttpService) {
    return {
        restrict: 'E',
        replace: true,
        controller: 'DashboardController',
        templateUrl: 'modules/dashboard/dashboard-directive.html',
        link: function(scope: Scope) {
        }
    }
}

DashboardDirective.$inject = ['$http'];