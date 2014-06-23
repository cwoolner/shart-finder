/* global define, require, angular */
define(function (require) {
    'use strict';

    var _ = require("lodash");

    function AddCharacterController(ApiService, AddCharacterService) {
	var addCharacterController = this;

	addCharacterController.ApiService = ApiService;
	addCharacterController.addCharacterService = AddCharacterService;
	addCharacterController.isModal = AddCharacterService.concrete.isModal;
	addCharacterController.formErrors = {};
	addCharacterController.formSuccess = undefined;
	addCharacterController.formGeneralError = undefined;
	addCharacterController.character = {};
	addCharacterController.character.name = "";
	addCharacterController.character.gender = "";
	addCharacterController.character.hasSensor = false;
    }

    AddCharacterController.prototype.setCharacterDefaults = function () {
        var self = this;
        self.character = {};
        self.character.name = "";
        self.character.gender = "";
        self.character.hasSensor = false;
    };  

    AddCharacterController.prototype.validateCharacter = function (character) {
	var self = this;
	console.log("character: " + character);
	console.log("validateCharacter.character.name: " + character.name);
	console.log("validateCharacter.characterGender.gender: " + character.gender);
	console.log("validateCharacter.characterHasSensor: " + character.hasSensor);

	if (_.isEmpty(character.name)) {
	    self.formErrors.character.name = { "message": "Name is required." };
	} else {
	    self.formErrors = _.omit(self.formErrors, 'character.name');	    
	}

	if (_.isEmpty(character.gender)) {
	    self.formErrors.character.gender = { "message": "Gender is required." };
	} else {
	    self.formErrors = _.omit(self.formErrors, 'character.gender');	    
	}
    };

    AddCharacterController.prototype.clearFormError = function (errorFieldToClear) {
	var self = this;
	self.formErrors = _.omit(self.formErrors, errorFieldToClear);
    };

    AddCharacterController.prototype.saveCharacter = function (character) {
	console.log("character: " + character);
	var self = this,
	name = character.name, 
	characterGender = character.gender, 
	characterHasSensor = character.hasSensor;
	
	self.validateCharacter(character);
	self.formSuccess = undefined;
	self.formGeneralError = undefined;

	if(_.isEmpty(self.formErrors)){
            self.character = angular.copy(character);
            self.ApiService.addCharacter(self.character).then(function(response){
                self.formSuccess = "BOOOOOOOOOOOOOM!!!!!";
                if(response && response.data){
                    console.log("data that came back: ",response.data);
                    self.availableCharacters.push(self.character);
                    self.availableCharacterNames.push(self.character.name);
                    self.setCharacterDefaults();
                    self.addCharacterService.concrete.finalize(response.data);
                }else{
                    self.formGeneralError = "BOOOOOOOOOOOOO!!!!! We got no response.";
                }
            }, function(error){
                console.log("This is the error", error);
                self.formGeneralError = "BOOOOOOOOOOOOO!!!!! You got an error: "+error;
            });
        }
    };
    
    return [ 'ApiService', 'AddCharacterService', AddCharacterController ];
});
