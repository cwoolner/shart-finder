/* global define, require, angular, _ */
define(function (require) {
    'use strict';

    function LandingController($location, ApiService) {
        var landingController = this;
        this.$location = $location;
    }

    LandingController.prototype.goTo = function (screenLocation) {
        var viewUrl = "/" + screenLocation;

        if (screenLocation != 'session' && screenLocation != 'search/characters') {
            viewUrl = viewUrl + "/";
        }

        console.log("Going to view: " + viewUrl);
        this.$location.url(viewUrl);
    }

    return ['$location', 'ApiService', LandingController ];
});
