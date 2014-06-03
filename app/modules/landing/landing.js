/* global define, require, _ */
define(function (require) {
    'use strict';

    var angular = require("angular");
    var landingController = require("modules/landing/landing-controller");
  
    var landing = angular.module("landing", []);
    landing.controller('landingCtrl', landingController);
  
    return landing;
});