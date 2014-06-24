/* global define, require */
define(function () {

    'use strict';

    return function () {

        var footerCtrl = this;

        footerCtrl.currentYear = new Date().getFullYear();
    };
});
