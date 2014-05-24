/* global define */
define(function (require) {
    "use strict";

    var angular = require("angular");
    var apiService = require("api/api-service");

    // Create the module
    var api = angular.module("api", []);

    // Define the service
    api.service('ApiService', apiService);

    return api;
});
