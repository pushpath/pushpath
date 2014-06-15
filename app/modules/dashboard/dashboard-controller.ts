/// <reference path="../../libs.d.ts" />

import dashboardService = require('modules/dashboard/dashboard-service');
import projectModels = require('modules/project/models');
import settingsModels = require('modules/settings/models');

export interface DashboardControllerScope extends ng.IScope {
    project: projectModels.Project;
    vm: settingsModels.VMInformation;

}

export class DashboardController {
	static $inject = ['$scope', 'dashboardSrv', '$q'];

	constructor(scope: DashboardControllerScope,
                dashboardSrv: dashboardService.DashboardService,
                $q: ng.IQService) {

        scope.project = <projectModels.Project>{};
        scope.vm = <settingsModels.VMInformation>{};

        $q.all([
            dashboardSrv.loadProject(),
            dashboardSrv.loadVm()
        ]).then((promises: any[]) => {
            scope.project = <projectModels.Project>promises[0].data;
            scope.vm = <settingsModels.VMInformation>promises[1].data;
        });

    }
}