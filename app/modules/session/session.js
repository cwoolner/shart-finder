define(function (require) {
  'use strict';

  var angular = require("angular");
  var sessionController = require("modules/session/session-controller");

  var landing = angular.module("session", []);
  landing.controller('SessionCtrl', sessionController);

  return landing;
});
