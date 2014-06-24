/* global define, require, angular, _ */
define(function (require) {
    'use strict';

    var addTagServiceDefaults = {
        isModal: false,
        finalize: function(){}
    };

    function AddTagService() {
        var addTagService = this;

        addTagService.isModal = false;
        this.concrete = addTagServiceDefaults;
    }

    AddTagService.prototype.resetToDefaults = function(){
        this.concrete = addTagServiceDefaults;
    };

    return [ AddTagService ];
});