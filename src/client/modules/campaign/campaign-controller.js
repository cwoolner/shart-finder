define(function (require) {
    'use strict';

    function CampaignController($state, $stateParams, $modal, ApiService) {

        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$modal = $modal;
        this.ApiService = ApiService;

        // Get the type passed in off of the route parameters
        // this.type = $stateParams.type;
        this.id = $stateParams.id;

        this.selectedResult = ApiService.apiResults.encounters;
    }

    return ['$state', '$stateParams', 'ApiService', CampaignController];
});