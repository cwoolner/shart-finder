/* global define, require, angular, _ */
define(function (require) {
  'use strict';

  var addCharacterServiceDefaults = {
    isModal: false,
    finalize: function(){}
  };

  function AddCharacterService() {
    var addCharacterService = this;

    addCharacterService.isModal = false;
    this.concrete = addCharacterServiceDefaults;
  }

  AddCharacterService.prototype.resetToDefaults = function(){
    this.concrete = addCharacterServiceDefaults;
  };

  return [ AddCharacterService ];
});
