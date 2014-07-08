define([], function () {

    'use strict';

    return function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('search', {
                url: "/search",
                templateUrl: 'modules/search/search.html',
                resolve: {
                    data: function (ApiService) {
                        return ApiService.getAll();
                    }
                }
            })
      
            .state('search-results', {
                url: "/search/:type",
                templateUrl: 'modules/search-results/search-results.html',
                resolve: {
                    data: function (ApiService, $stateParams) {
                        return ApiService.getByType($stateParams.type);
                    }
                }
            })

            .state('result-detail', {
                url: "/result-detail/:type/:id",
                templateUrl: 'modules/result-detail/result-detail.html',
                resolve: {
                    data : function (ApiService, $stateParams) {
                        return ApiService.getById($stateParams.type, $stateParams.id);
                    }
                }
            })

            .state('encounter', {
                url: "/encounter/:id",
                templateUrl: 'modules/encounter/encounter.html',

                resolve: {
                    data : function (ApiService, $stateParams) {
                        return ApiService.getEncounterById($stateParams.id);
                    }
                }
        })

            .state('add-campaign', {
                url: "/add-campaign",
                templateUrl: 'modules/campaign/add-campaign.html',

                resolve: {
                    data : function (ApiService, $stateParams) {
                        return;
                    }
                }
	    })
            .state('view-character', {
		url: "/character/:id",
		templateUrl: 'modules/character/view-character.html',
		resolve: {
		    data : function (ApiService, $stateParams) {
			return ApiService.getById("characters", $stateParams.id);
		    }
		}
            })
	    .state('add-character', {
		url: "/add-character",
		templateUrl: 'modules/character/add-character.html',
		resolve: {
		    data : function (ApiService) {
			return ApiService.getAll();
		    }
		}
            })

            .state('landing', {
                url: '/landing',
                templateUrl: "modules/landing/landing.html",
                resolve: {
                    data: function (ApiService) {
                        return ApiService.getAll();
                    }
                }
            })
            .state('session', {
                url: '/session',
                templateUrl: "modules/session/session.html",
                resolve: {
                    data: function (ApiService) {
                        return ApiService.getAll();
                    }
                }
            });


        // If none of the above states are matched, use this as the fallback
        $urlRouterProvider
            .when("/home", "/landing")
            .otherwise('/landing');
    };
});
