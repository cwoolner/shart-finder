/* global define */
define(function (require) {
    "use strict";

    // Require statements
    var angular = require("angular");
    var characterDetailController = require("modules/character/character-detail-controller");

    // Create character detail module
    var characterDetail = angular.module("characterDetail", []);

    // Define the controller
    characterDetail.controller('CharacterDetailCtrl', characterDetailController);

    return characterDetail;
});
