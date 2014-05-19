/// <reference path="../../libs.d.ts" />

import projectService = require('modules/project/project-service');

export interface Scope extends  ng.IScope {
    currentProjectId: string;
    projectDetails: any;

    addProject: () => void;

}

export var ProjectDirective = function(
        projectSrv: projectService.ProjectService
    ) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'modules/project/project-details-directive.html',
        link: function(scope: Scope) {
        }
    }
}

ProjectDirective.$inject = ['projectSrv'];