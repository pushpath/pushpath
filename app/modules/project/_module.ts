/// <reference path="../../libs.d.ts" />

import projectController = require('./project-controller');
import projectDetailsDirective = require('./project-details-directive');
import projectService = require('./project-service');

var _module = angular.module('Pushpath.Project', []);
_module.controller('ProjectController', projectController.ProjectController);
_module.directive('projectDetails', projectDetailsDirective.ProjectDirective);
_module.service('projectSrv', projectService.ProjectService);

