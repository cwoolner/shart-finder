define(function (require) {
    'use strict';

    function EncounterDetailController($state, $stateParams, ApiService) {

        this.$state = $state;
        this.$stateParams = $stateParams;
        this.ApiService = ApiService;

        // Get the type passed in off of the route parameters
        this.type = $stateParams.type;
        this.id = $stateParams.id;

      console.log($stateParams);

        this.selectedEncounter = ApiService.selectedResult;
    }

    return ['$state', '$stateParams', 'ApiService', EncounterDetailController];
});
