/// <reference path="../../libs.d.ts" />

import projectService = require('modules/project/project-service');
import models = require('./models');

export interface ProjectControllerScope extends ng.IScope {
    project: models.Project;

    addProject: () => void;
    updateProject: () => void;
    deleteProject: (currentProjectId) => void;
}

export class ProjectController {
    static $inject = ['$scope', 'projectSrv', '$q'];

    constructor(scope: ProjectControllerScope,
                projectSrv: projectService.ProjectService,
                $q: ng.IQService) {

        scope.project = <models.Project>{};

        scope.addProject = (): void => {
            if (scope.project) {
                projectSrv.addProject(scope.project)
                    .then(function(response){
                        scope.project['id'] = '1';
                    });
            }
        }

        scope.updateProject = (): void => {
            projectSrv.addProject(scope.project).then(
                function() {
                    console.log('project update...');
                }
            );
        }

        scope.deleteProject = (currentProjectId: string): void => {
            projectSrv.deleteProject(currentProjectId).then(
                function(){
                    scope.project = <models.Project>{};

                    console.log('project deleted...');
                }
            );
        }

        $q.all([
            projectSrv.getProject()
        ]).then((promises: any[]) => {
            scope.project = <models.Project>promises[0].data;
        });
    }
}