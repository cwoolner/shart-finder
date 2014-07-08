/* global define */
define(function (require) {
    "use strict";

    // Require statements
    var angular = require("angular");
    var campaignController = require("modules/campaign/campaign-controller");

    // Create result detail module
    var campaign = angular.module("campaign", []);

    // Define the controller
    campaign.controller('CampaignCtrl', campaignController);

    return campaign;
});
