/* global define */
define(function (require) {
    "use strict";

    // Require statements
    var angular = require("angular");
    var encounterDetailController = require("modules/encounter-detail/encounter-detail-controller");

    // Create encounter detail module
    var encounterDetail = angular.module("encounterDetail", []);

    // Define the controller
    encounterDetail.controller('EncounterDetailCtrl', encounterDetailController);

    return encounterDetail;
});
