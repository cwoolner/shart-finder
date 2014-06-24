/* global define, require, angular */
define(function (require) {
    'use strict';

    var _ = require("lodash");

    function AddPersonController(ApiService, AddPersonService) {
        var addPersonController = this;

        addPersonController.ApiService = ApiService;
        addPersonController.addPersonService = AddPersonService;
        addPersonController.isModal = AddPersonService.concrete.isModal;
        addPersonController.formErrors = {};
        addPersonController.formSuccess = undefined;
        addPersonController.formGeneralError = undefined;
        addPersonController.person = undefined;
        addPersonController.availablePeople = [];
        addPersonController.availablePeopleNames = [];

        // Build the result data for display on screen
        addPersonController.buildAvailablePeople(ApiService.apiResults);
    }

    AddPersonController.prototype.validatePerson = function(person){
        var self = this;
        if(_.isEmpty(person)){
            self.formErrors.person = { "message":"This is required." };
        }else if(_.contains(self.availablePeopleNames, person.toLowerCase())){
            self.formErrors.person = { "message":"This person already exists." };
        }else{
            self.formErrors = _.omit(self.formErrors, 'person');
        }
    };

    AddPersonController.prototype.clearFormError = function(errorFieldToClear){
        var self = this;
        self.formErrors = _.omit(self.formErrors, errorFieldToClear);
    };

    AddPersonController.prototype.savePerson = function (person) {
        var self = this;
        self.validatePerson(person);
        self.formSuccess = undefined;
        self.formGeneralError = undefined;

        if(_.isEmpty(self.formErrors)){
            self.person = angular.copy(person);
            self.ApiService.addPerson(self.person).then(function(data){
                self.person = undefined;
                self.formSuccess = "BOOOOOOOOOOOOOM!!!!!";
                if(data){
                    console.log(data);
                }
                self.addPersonService.concrete.finalize();
            }, function(error){
                self.formGeneralError = "BOOOOOOOOOOOOO!!!!! You got an error: "+error;
            });
        }
    };

    AddPersonController.prototype.buildAvailablePeople = function(data){
        var self = this;
        self.availablePeople = [];
        if(data && data.people){
            for (var t=0;t<data.people.length;t++){
                var peopleName = data.people[t].name.toLowerCase();
                self.availablePeople.push(data.people[t]);
                self.availablePeopleNames.push(peopleName);
            }

            console.log("availablePeople",self.availablePeople);
        }else{
            console.warn("buildAvailablePeople NEEDS data!");
        }

    };

    return [ 'ApiService', 'AddPersonService', AddPersonController ];
});