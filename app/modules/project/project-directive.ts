/// <reference path="../../libs.d.ts" />

import projectService = require('modules/project/project-service');

export interface Scope extends  ng.IScope {
    newProject: projectService.projectDtails;

    addProject: () => void;
}

export var ProjectDirective = function(
        projectSrv: projectService.ProjectService
    ) {
    return {
        replace: true,
        templateUrl: 'modules/project/project-directive.html',
        link: function(scope: Scope) {
            scope.addProject = (): void => {
                projectSrv.addProject(scope.newProject);
            }
        }
    }
}

ProjectDirective.$inject = ['projectSrv'];