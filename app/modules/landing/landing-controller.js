/* global define, require, angular, _ */
define(function (require) {
    'use strict';

    function LandingController(ApiService) {
        var landingController = this;
	landingController.test = 'testStuff';
    }


    return [ 'ApiService', LandingController ];
});
