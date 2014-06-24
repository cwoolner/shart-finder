/* global define, require, angular, _ */
define(function (require) {
    'use strict';

    var addPersonServiceDefaults = {
        isModal: false,
        finalize: function(){}
    };

    function AddPersonService() {
        var addPersonService = this;

        addPersonService.isModal = false;
        this.concrete = addPersonServiceDefaults;
    }

    AddPersonService.prototype.resetToDefaults = function(){
        this.concrete = addPersonServiceDefaults;
    };

    return [ AddPersonService ];
});