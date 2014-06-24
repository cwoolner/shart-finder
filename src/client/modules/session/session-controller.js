/* global define, require, angular, _ */
define(function (require) {
  'use strict';

  function SessionController(ApiService) {
    var self = this;
    self.test = 'testStuff';
  }

  return [ 'ApiService', SessionController ];
});
