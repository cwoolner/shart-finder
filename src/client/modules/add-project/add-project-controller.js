/* global define, require, angular, _ */
define(function (require) {
    'use strict';

    var addTagController = require('modules/add-tag/add-tag-controller'),
        addPersonController = require('modules/add-person/add-person-controller');

    function AddProjectController($modal, $controller, AddTagService, AddPersonService, ApiService) {
        var addProjectController = this;

        addProjectController.modal = $modal;
        addProjectController.ApiService = ApiService;
        addProjectController.addTagService = AddTagService;
        addProjectController.addPersonService = AddPersonService;
        addProjectController.controller = $controller;
        addProjectController.formErrors = {};
        addProjectController.formSuccess = undefined;
        addProjectController.formGeneralError = undefined;
        addProjectController.project = {};
        addProjectController.project.tags = [];
        addProjectController.project.team = [];
        addProjectController.selectedTag = undefined;
        addProjectController.selectedPerson = undefined;
        addProjectController.availableTags = [];
        addProjectController.availablePeople = [];
        addProjectController.someTags = [];
        addProjectController.somePeople = [];

        // Build the result data for display on screen
        addProjectController.buildResultData(ApiService.apiResults);
    }

    AddProjectController.prototype.addTagToProject = function (selectedTag) {
        var self = this;
        self.clearFormError('projectTags');
        if (!_.contains(self.project.tags, selectedTag)) {
            self.project.tags.push(selectedTag);
            console.log("You added", selectedTag);
            self.updateSomeTags();
        }
        self.selectedTag = undefined;
    };

    AddProjectController.prototype.removeTagFromProject = function (tagToRemove) {
        var self = this;
        console.log("You want to remove", tagToRemove);
        self.project.tags = _.without(self.project.tags, tagToRemove);
        self.updateSomeTags();
        //self.validateProjectTags(self.project.tags);
    };

    AddProjectController.prototype.addPersonToProject = function (selectedPerson) {
        var self = this;
        self.clearFormError('projectTeam');
        if (!_.contains(self.project.team, selectedPerson)) {
            self.project.team.push(selectedPerson);
            console.log("You added", selectedPerson);
            self.updateSomePeople();
        }
        self.selectedPerson = undefined;
    };

    AddProjectController.prototype.removePersonFromProject = function (personToRemove) {
        var self = this;
        console.log("You want to remove", personToRemove);
        self.project.team = _.without(self.project.team, personToRemove);
        //self.validateProjectTeam(self.project.team);
    };

    AddProjectController.prototype.clearFormError = function (errorFieldToClear) {
        var self = this;
        self.formErrors = _.omit(self.formErrors, errorFieldToClear);
    };

    AddProjectController.prototype.validateProjectName = function (projectName) {
        var self = this;
        console.log("validateProjectName", projectName);
        if (_.isEmpty(projectName)) {
            self.formErrors.projectName = { "message": "Please add a project name." };
        } else {
            self.formErrors = _.omit(self.formErrors, 'projectName');
        }
    };

    AddProjectController.prototype.validateProjectTags = function (projectTags) {
        var self = this;
        if (_.isEmpty(projectTags) || projectTags.length === 0) {
            self.formErrors.projectTags = { "message": "Please add some tags to the project." };
        } else {
            self.formErrors = _.omit(self.formErrors, 'projectTags');
        }
    };

    AddProjectController.prototype.validateProjectTeam = function (projectTeam) {
        var self = this;
        if (_.isEmpty(projectTeam) || projectTeam.length === 0) {
            self.formErrors.projectTeam = { "message": "Please add some people to the project team." };
        } else {
            self.formErrors = _.omit(self.formErrors, 'projectTeam');
        }
    };

    AddProjectController.prototype.validateProjectDescription = function (projectDescription) {
        var self = this;
        if (_.isEmpty(projectDescription)) {
            self.formErrors.projectDescription = { "message": "Please add a description for the project." };
        } else {
            self.formErrors = _.omit(self.formErrors, 'projectDescription');
        }
    };

    AddProjectController.prototype.validateProject = function (project) {
        var self = this;
        self.validateProjectName(project.name);
        self.validateProjectTags(project.tags);
        self.validateProjectTeam(project.team);
        self.validateProjectDescription(project.description);
    };

    AddProjectController.prototype.saveProject = function (project) {
        var self = this;
        self.validateProject(project);
        self.formSuccess = undefined;
        self.formGeneralError = undefined;

        if (_.isEmpty(self.formErrors)) {
            self.project = angular.copy(project);
            self.ApiService.addProject(self.project).then(function (data) {
                self.project = {};
                self.formSuccess = "BOOOOOOOOOOOOOM!!!!!";
                if (data) {
                    console.log(data);
                }
            }, function (error) {
                self.formGeneralError = "BOOOOOOOOOOOOO!!!!! You got an error: " + error;
            });
        }
    };

    AddProjectController.prototype.openAddTag = function () {
        var self = this;

        var addTagModal = self.modal.open({
            templateUrl: 'modules/add-tag/add-tag.html',
            size: 'lg',
            controller: addTagController,
            resolve: {
                data: function () {
                    return self.ApiService.getTagResults();
                }
            }
        });

        var closeAddTagModalCleanup = function(){
            self.addTagService.resetToDefaults();
        };

        self.addTagService.concrete = {
            isModal: true,
            finalize: function(){
                addTagModal.close("Tag is added, go and close modal");
                closeAddTagModalCleanup();
            }
        };

        addTagModal.result.then(function (answer) {
            console.log('Add Tag Modal Answer: '+answer);
            closeAddTagModalCleanup();
        }, function () {
            console.log('Add Tag Modal Dismissed');
            closeAddTagModalCleanup();
        });
    };

    AddProjectController.prototype.openAddPerson = function () {
        var self = this;

        var addPersonModal = self.modal.open({
            templateUrl: 'modules/add-person/add-person.html',
            size: 'lg',
            controller: addPersonController,
            resolve: {
                data: function () {
                    return self.ApiService.getPeopleResults();
                }
            }
        });

        var closeAddPersonModalCleanup = function(){
            self.addPersonService.resetToDefaults();
        };

        self.addPersonService.concrete = {
            isModal: true,
            finalize: function(){
                addPersonModal.close("Person is added, go and close modal");
                closeAddPersonModalCleanup();
            }
        };

        addPersonModal.result.then(function (answer) {
            console.log('Add Person Modal Answer: '+answer);
            closeAddPersonModalCleanup();
        }, function () {
            console.log('Add Person Modal Dismissed');
            closeAddPersonModalCleanup();
        });
    };

    AddProjectController.prototype.updateSomeTags = function () {
        var self = this;
        console.log("availableTags", self.availableTags);
        self.someTags = _.difference(self.availableTags, self.project.tags);
        console.log("updated someTags", self.someTags);
    };

    AddProjectController.prototype.updateSomePeople = function () {
        var self = this;
        self.somePeople = _.difference(self.availablePeople, self.project.team);
        console.log("updated somePeople", self.somePeople);
    };

    AddProjectController.prototype.buildAvailableTags = function (data) {
        var self = this;
        self.availableTags = [];
        if (data && data.tags) {
            for (var t = 0; t < data.tags.length; t++) {
                self.availableTags.push(data.tags[t].name);
            }

            self.updateSomeTags();
        } else {
            console.warn("buildAvailableTags NEEDS data!");
        }
    };

    AddProjectController.prototype.buildAvailablePeople = function (data) {
        var self = this;
        self.availablePeople = [];
        if (data && data.people) {
            for (var p = 0; p < data.people.length; p++) {
                self.availablePeople.push(data.people[p].name);
            }

            self.updateSomePeople();
        } else {
            console.warn("buildAvailablePeople NEEDS data!");
        }
    };

    AddProjectController.prototype.buildResultData = function (data) {
        var self = this;
        self.buildAvailablePeople(data);
        self.buildAvailableTags(data);
    };

    return [ '$modal', '$controller', 'AddTagService', 'AddPersonService', 'ApiService', AddProjectController ];

});
