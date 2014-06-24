/* global define, require */
define(function (require) {
    'use strict';

    // Require statements
    var angular = require("angular");
    var addProjectController = require("modules/add-project/add-project-controller");
    var addTagService = require("modules/add-tag/add-tag-service");

    // Create addProject module
    var addProject = angular.module("addProject", []);

    // Define the controller
    addProject.controller('AddProjectCtrl', addProjectController);
    addProject.service('AddTagService', addTagService);

    return addProject;
});