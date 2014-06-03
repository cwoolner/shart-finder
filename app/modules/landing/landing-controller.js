/* global define, require, angular, _ */
define(function (require) {
    'use strict';

    function AddTagController(ApiService, AddTagService) {
        var addTagController = this;

        addTagController.addTagService = AddTagService;
        addTagController.ApiService = ApiService;
        addTagController.isModal = AddTagService.concrete.isModal;
        addTagController.formErrors = {};
        addTagController.formSuccess = undefined;
        addTagController.formGeneralError = undefined;
        addTagController.tag = undefined;
        addTagController.availableTags = [];
        addTagController.availableTagNames = [];

        // Build the result data for display on screen
        addTagController.buildAvailableTags(ApiService.apiResults);
    }

    AddTagController.prototype.validateTag = function(tag){
        var self = this;
        if(_.isEmpty(tag)){
            self.formErrors.tag = { "message":"This is required." };
        }else if(_.contains(self.availableTagNames, tag.toLowerCase())){
            self.formErrors.tag = { "message":"This tag already exists." };
        }else{
            self.formErrors = _.omit(self.formErrors, 'tag');
        }
    };

    AddTagController.prototype.clearFormError = function(errorFieldToClear){
        var self = this;
        self.formErrors = _.omit(self.formErrors, errorFieldToClear);
    };

    AddTagController.prototype.saveTag = function (tag) {
        var self = this;
        self.validateTag(tag);
        self.formSuccess = undefined;
        self.formGeneralError = undefined;

        if(_.isEmpty(self.formErrors)){
            self.tag = angular.copy(tag);
            self.ApiService.addTag(self.tag).then(function(data){
                self.tag = undefined;
                self.formSuccess = "BOOOOOOOOOOOOOM!!!!!";
                if(data){
                    console.log("data that came back: "+data);
                }
                self.addTagService.concrete.finalize();
            }, function(error){
                self.formGeneralError = "BOOOOOOOOOOOOO!!!!! You got an error: "+error;
            });
        }
    };

    AddTagController.prototype.buildAvailableTags = function(data){
        var self = this;
        self.availableTags = [];
        if(data && data.tags){
            for (var t=0;t<data.tags.length;t++){
                var tagName = data.tags[t].name.toLowerCase();
                self.availableTags.push(data.tags[t]);
                self.availableTagNames.push(tagName);
            }

            console.log("availableTags",self.availableTags);
        }else{
            console.warn("buildAvailableTags NEEDS data!");
        }
    };

    return [ 'ApiService', 'AddTagService', AddTagController ];
});