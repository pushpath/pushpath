/// <reference path="../../libs.d.ts" />

import dashboardController = require('./dashboard-controller');
import dashboardDirective = require('./dashboard-directive');
import dashboardService = require('./dashboard-service');

var _module = angular.module('Pushpath.Dashboard', []);
_module.controller('DashboardController', dashboardController.DashboardController);
_module.directive('dashboard', dashboardDirective.DashboardDirective);
_module.service('dashboardSrv', dashboardService.DashboardService);