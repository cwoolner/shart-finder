/* global define, require */
define(function (require) {
    'use strict';

    var angular = require("angular");
    var addPersonController = require("modules/add-person/add-person-controller");
    var addPersonService = require("modules/add-person/add-person-service");

    var addPerson = angular.module("addPerson", []);
    addPerson.controller('AddPersonCtrl', addPersonController);
    addPerson.service('AddPersonService', addPersonService);

    return addPerson;
});
