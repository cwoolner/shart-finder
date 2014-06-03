/* global define */
define(function (require) {
    "use strict";

    // Require statements
    var angular = require("angular");
    var encounterController = require("modules/encounter/encounter-controller");

    // Create result detail module
    var encounter = angular.module("encounter", []);

    // Define the controller
    encounter.controller('EncounterCtrl', encounterController);

    return encounter;
});
