define(function (require) {
    'use strict';

    function EncounterController($state, $stateParams, ApiService) {

        this.$state = $state;
        this.$stateParams = $stateParams;
        this.ApiService = ApiService;

        // Get the type passed in off of the route parameters
       // this.type = $stateParams.type;
        this.id = $stateParams.id;

        this.selectedResult = ApiService.apiResults.encounters[0];
    }


    return ['$state', '$stateParams', 'ApiService', EncounterController];
});
