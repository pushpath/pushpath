/// <reference path="../../libs.d.ts" />

import settingsController = require('./settings-controller');

var _module = angular.module('Pushpath.Settings', []);
_module.controller('SettingsController', settingsController.SettingsController);