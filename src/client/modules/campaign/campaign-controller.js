define(function (require) {
    'use strict';

    function CampaignController($state, $stateParams, ApiService) {

        this.$state = $state;
        this.$stateParams = $stateParams;
        this.ApiService = ApiService;

        // Get the type passed in off of the route parameters
        // this.type = $stateParams.type;
        this.id = $stateParams.id;
    }

    CampaignController.prototype.save = function(campaign) {
        console.log("campaign to save: " + campaign);
        var self = this;
        self.ApiService.addCampaign(angular.copy(campaign)).then(function(response){
            // robustify this
            console.log("Saved campaign.");
        }, function(error){
            console.log("Failed to save campaign.");
        });
    };

    return ['$state', '$stateParams', 'ApiService', CampaignController];
});