/// <reference path="../../libs.d.ts" />

export interface SettingsControllerScope extends ng.IScope {
    message: string;
}

export class SettingsController {
    static $inject = ['$scope'];

    constructor(scope: SettingsControllerScope) {
        scope.message = "Settings";
    }
}