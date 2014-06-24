/* global define, require */
define(function (require) {
    "use strict";

    var angular = require("angular");
    var headerController = require("modules/navigation/header-controller");
    var footerController = require("modules/navigation/footer-controller");

    // Create module
    var nav = angular.module("navigation", []);

    // Define controllers
    nav.controller('HeaderCtrl', headerController);
    nav.controller('FooterCtrl', footerController);

    return nav;
});