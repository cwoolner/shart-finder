/* global define */
define(function (require) {
    "use strict";

    var angular = require("angular");
    var searchResultsController = require("modules/search-results/search-results-controller");

    var searchResults = angular.module("searchResults", []);

    searchResults.controller('SearchResultsCtrl', searchResultsController);

    return searchResults;
});
