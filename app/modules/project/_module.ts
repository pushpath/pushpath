/// <reference path="../../libs.d.ts" />

import projectController = require('./project-controller');
import projectDirective = require('./project-directive');
import projectService = require('./project-service');

var _module = angular.module('Pushpath.Project', []);
_module.controller('ProjectController', projectController.ProjectController);
_module.directive('project', projectDirective.ProjectDirective);
_module.service('projectSrv', projectService.ProjectService);

