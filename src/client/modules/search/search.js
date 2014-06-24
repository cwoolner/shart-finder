/* global define */
define(function (require) {
    "use strict";

    // Require statements
    var angular = require("angular");
    var searchController = require("modules/search/search-controller");

    // Create search module
    var search = angular.module("search", []);

    // Define the controller
    search.controller('SearchCtrl', searchController);

    return search;
});
