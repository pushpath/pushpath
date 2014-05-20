/// <reference path="../../libs.d.ts" />

import projectService = require('modules/project/project-service');

export interface ProjectControllerScope extends ng.IScope {
    currentProjectId: string;
    projectDetails: any;
    project: any;

    addProject: () => void;
    updateProject: () => void;
    deleteProject: (currentProjectId) => void;
}

export class ProjectController {
    static $inject = ['$scope', 'projectSrv'];

    constructor(scope: ProjectControllerScope, projectSrv: projectService.ProjectService) {
        var loadProjectDetails: () => void;
        scope.currentProjectId = '';
        scope.projectDetails = {};
        scope.project = {};

        scope.addProject = (): void => {
            if (scope.project) {
                projectSrv.addProject(scope.project)
                    .then(function(response){
                        scope.project['id'] = '1';
                    });
            }
        }

        loadProjectDetails = (): void => {
            projectSrv.getProject(scope.currentProjectId).then(
                function(response) {
                    scope.project = response.data;
                }
            )
        }
        loadProjectDetails();

        scope.updateProject = (): void => {
            projectSrv.addProject(scope.projectDetails).then(
                function() {
                    console.log('project update...');
                }
            );
        }

        scope.deleteProject = (currentProjectId: string): void => {
            projectSrv.deleteProject(currentProjectId).then(
                function(response){
                    console.log('project deleted...');
                }
            );
        }
    }
}