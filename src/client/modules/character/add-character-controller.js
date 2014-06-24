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
	// addCharacterController.character.name = "";
	// addCharacterController.character.player = "";
	// addCharacterController.character.sex = "";
	// addCharacterController.character.race = "";
	// addCharacterController.character.characterClass = "";
	// addCharacterController.character.level = "";
	// addCharacterController.character.alignment = "";
	// addCharacterController.character.age = "";
	// addCharacterController.character.height = "";
	// addCharacterController.character.weight = "";
	// addCharacterController.character.experiencePoints = "";
    }

    AddCharacterController.prototype.setCharacterDefaults = function () {
        var self = this;
        self.character = {};
	self.character.name = "";
	self.character.player = "";
	self.character.sex = "";
	self.character.race = "";
	self.character.characterClass = "";
	self.character.level = "";
	self.character.alignment = "";
	self.character.age = "";
	self.character.height = "";
	self.character.weight = "";
	self.character.experiencePoints = "";
    };  

    AddCharacterController.prototype.validateCharacter = function (character) {
	var self = this;
	console.log("character: " + character);
	console.log("validateCharacter.character.name: " + character.name);

	if (_.isEmpty(character.name)) {
	    self.formErrors.character.name = { "message": "Name is required." };
	} else {
	    self.formErrors = _.omit(self.formErrors, 'character.name');	    
	}
    };

    AddCharacterController.prototype.clearFormError = function (errorFieldToClear) {
	var self = this;
	self.formErrors = _.omit(self.formErrors, errorFieldToClear);
    };

    AddCharacterController.prototype.saveCharacter = function (character) {
	console.log("character: " + character);
	var self = this,
	name = character.name;
	
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
