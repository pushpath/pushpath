var controller = require('./dashboard-controller');
var directive = require('./dashboard-directive');

var _module = angular.module('Pushpath.Dashboard', []);
_module.controller('DashboardController', controller.DashboardController);
_module.directive('dashboard', directive.DashboardDirective);