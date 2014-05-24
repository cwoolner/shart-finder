/* global define */
define(function () {
    'use strict';

    // Constructor Function
    function SearchController($state, ApiService) {

        // Store location into this for access in the prototype methods
        this.$state = $state;

        // Build the result data for display on screen
        this.buildResultData(ApiService.apiResults);
    }

    // Uses the data returned from the service to build the onscreen accordion
    SearchController.prototype.buildResultData = function (data) {

        // Get the getGroup function
        var group = this.getGroup(data);

        // Build an array of the objects from each getGroup invocation
        this.groups = [
            group("Projects", true),
            group("Tags", true),
            group("People", true)
        ];
    };

    // Get group function which uses currying to return a function that will be used to generate an object
    SearchController.prototype.getGroup = function (data) {
        data = data || {};
        return function (type, isOpen) {
            type = type || "";
            return {
                title: type,
                content: type,
                items : data[type.toLowerCase()] || [],
                isOpen : isOpen
            };
        };
    };

    // Navigate user to view search results
    SearchController.prototype.viewSearchResults = function (e, type) {
        e.preventDefault();
        e.stopPropagation();
        this.$state.go("search-results", {type: type.toLowerCase()});
    };

    return [ '$state', 'ApiService', SearchController ];
});
