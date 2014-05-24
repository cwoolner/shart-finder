/* global define, require, _ */
define(function (require) {
    'use strict';

    var angular = require("angular");
    var addTagController = require("modules/add-tag/add-tag-controller");
    var addTagService = require("modules/add-tag/add-tag-service");

    var addTag = angular.module("addTag", []);
    addTag.controller('AddTagCtrl', addTagController);
    addTag.service('AddTagService', addTagService);

    return addTag;
});