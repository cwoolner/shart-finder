define(function (require) {
    'use strict';

    function EncounterController($state, $stateParams, $modal, ApiService) {

        this.$state = $state;
        this.$stateParams = $stateParams;
        this.$modal = $modal;
        this.ApiService = ApiService;

        // Get the type passed in off of the route parameters
       // this.type = $stateParams.type;
        this.id = $stateParams.id;

        this.selectedResult = ApiService.apiResults.encounters;
    }

    EncounterController.prototype.openCreateModal = function() {
        var self = this;

        console.log("clicked");

        var ModalInstanceCtrl = function ($scope, $modalInstance) {

            $scope.ok = function () {
                $modalInstance.close();
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };

        var modalInstance = self.$modal.open({
            templateUrl: "modules/encounter/newEncounter.html",
            controller: ModalInstanceCtrl,
            resolve: {

            }
        });

        modalInstance.result.then(function () {
            console.log("got here");
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    }

    return ['$state', '$stateParams', '$modal', 'ApiService', EncounterController];
});
