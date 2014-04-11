/// <reference path="../../libs.d.ts" />

export interface ProjectControllerScope extends ng.IScope {
}

export class ProjectController {
    static $inject = ['$scope'];
    constructor(scope: ProjectControllerScope) {
    }
}