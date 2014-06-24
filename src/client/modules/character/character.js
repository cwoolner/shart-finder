/* global define, require, _ */
define(function (require) {
    'use strict';

    var angular = require("angular");
    var addCharacterController = require("modules/character/add-character-controller");
    var addCharacterService = require("modules/character/add-character-service");
    var viewCharacterController = require("modules/character/view-character-controller");

    // Create module
    var character = angular.module("character", []);

    // Create controllers
    character.controller('AddCharacterCtrl', addCharacterController);
    character.service('AddCharacterService', addCharacterService);
    character.controller('ViewCharacterCtrl', viewCharacterController);

    return character;
});
