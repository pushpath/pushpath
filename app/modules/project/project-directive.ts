/// <reference path="../../libs.d.ts" />

import projectService = require('modules/project/project-service');

export interface Scope extends  ng.IScope {
    currentProjectId: string;
    projectDetails: any;

    addProject: () => void;
    updateProject: () => void;
    deleteProject: (currentProjectId) => void;
}

export var ProjectDirective = function(
        projectSrv: projectService.ProjectService
    ) {
    return {
        replace: true,
        templateUrl: 'modules/project/project-directive.html',
        link: function(scope: Scope) {

            var loadProjectDetails: () => void;

            scope.currentProjectId = '';
            scope.projectDetails = ''

            loadProjectDetails = (): void => {
                projectSrv.getProject(scope.currentProjectId).then(
                    function() {
                        scope.currentProjectId = 'abc123';
                    }
                )
            }

            loadProjectDetails();

            scope.addProject = (): void => {
                projectSrv.addProject(scope.projectDetails).then(
                    function(response){
                    }
                );
            }

            scope.updateProject = (): void => {
                projectSrv.addProject(scope.projectDetails).then(
                    function() {
                        // project updated
                    },
                    function(reason) {
                    }
                );
            }

            scope.deleteProject = (currentProjectId: string): void => {
                projectSrv.deleteProject(currentProjectId).then(
                    function(){
                        // project deleted
                    },
                    function(reason) {
                        // server error
                    }
                );
            }
        }
    }
}

ProjectDirective.$inject = ['projectSrv'];