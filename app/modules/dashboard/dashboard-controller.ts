/// <reference path="../../libs.d.ts" />

export interface DashboardControllerScope extends ng.IScope {
    message: string;
}

export class DashboardController {
	static $inject = ['$scope'];

	constructor(scope: DashboardControllerScope) {
        scope.message = "hello controller!!";
    }
}