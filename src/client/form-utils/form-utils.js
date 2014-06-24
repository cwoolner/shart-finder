/* global define, require, angular */
define(function (require) {
    'use strict';

    var angular = require('angular');
    var autoFocus = require('form-utils/auto-focus-directive');
    var formatArrayFilter = require('form-utils/format-array-filter');


    var formUtils = angular.module('FormUtils', []);
    formUtils.directive('autoFocus', autoFocus);

    formUtils.filter('formatArray', formatArrayFilter);

    return formUtils;
});
