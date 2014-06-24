/* global define */
define(function (require) {
    "use strict";

    // Require statements
    var angular = require("angular");
    var resultDetailController = require("modules/result-detail/result-detail-controller");

    // Create result detail module
    var resultDetail = angular.module("resultDetail", []);

    // Define the controller
    resultDetail.controller('ResultDetailCtrl', resultDetailController);

    return resultDetail;
});
