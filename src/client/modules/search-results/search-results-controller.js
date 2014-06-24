/* global define */
define(function () {

    'use strict';

    function SearchResultsController($stateParams, ApiService) {
        // Get the type passed in off of the state parameters
        this.selectedType = $stateParams.type;
        console.log(this.results);
        this.results = ApiService.apiResults[this.selectedType];
    }

    SearchResultsController.prototype.resultsExist = function () {
        console.log("results = "+this.results);
        return this.results && this.results.length > 0;
    };

    SearchResultsController.prototype.deleteByType = function () {

        console.log('delete');
    };

    return ['$stateParams', 'ApiService', SearchResultsController];
});
