/// <reference path="../../libs.d.ts" />

import dashboardService = require('modules/dashboard/dashboard-service');

export interface DashboardControllerScope extends ng.IScope {
    project: any;
    vm: any;

}

export class DashboardController {
	static $inject = ['$scope', 'dashboardSrv'];

	constructor(scope: DashboardControllerScope, dashboardSrv: dashboardService.DashboardService) {
        var loadProject: () => void;
        var loadVm: () => void;

        scope.project = {};
        scope.vm = {};

        loadProject = (): void => {
            dashboardSrv.loadProject()
                .then((response) => {
                    scope.project = response.data;
                });
        }

        loadVm = (): void => {
            dashboardSrv.loadVm()
                .then((response) => {
                    scope.vm = response.data;
                });
        }

        loadProject();
        loadVm();
    }
}