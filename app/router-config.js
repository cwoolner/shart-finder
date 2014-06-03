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

            // Two ways this page could be created:
            // 1.  By using nested views, which means we'd have to explicitly define the URLs and couldn't parameterize
            //      the type.  This is because /search/:type for all 3 types (people, tags, projects) resulted in some of these
            //      states being fired twice because the URL was the same.  So, this means we'd have to have a URL
            //      for each type.  As a result, we couldn't pass parameters using the $stateParams because parameters
            //      aren't registered on that state and you can't just arbitrarily pass params to a state in which they're
            //      not defined (i.e. :type).  So parameters would have to be injected through a service (overkill for
            //      one value) or through shared $scope.  Also causes us to have ugly string concatenation in building
            //      the desired state (i.e. "search-results." + type)
            // 2.  Defining one state that is parameterized by type.  This results in having to do ng-switch conditional
            //      logic to display differing HTML in the search-results HTML page, but it allows us access to a param
            //      in the URL, decoupling this page from the previous and allowing direct access
            //
            //  Decided on the second approach because it allows a user to just put in the URL and achieve RESTful
            //      functionality through the URL.  For example, putting in a URL of /search/tags would take them to the
            //      the tags page and retrieve the data.  Doing it the first way causes a tight dependence on the first
            //      page and possibly on the $scope.  So, the user wouldn't be able to simply jump to this URL
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

          .state('character-detail', {
            url: "/character-detail/:id",
            templateUrl: 'modules/character-detail/character-detail.html',
            resolve: {
              data : function (ApiService, $stateParams) {
                return ApiService.getById("character", $stateParams.id);
              }
            }
          })

            .state('add-project', {
                url: "/add-project",
                templateUrl: "modules/add-project/add-project.html",
                resolve: {
                    data: function (ApiService) {
                        return ApiService.getAll();
                    }
                }
            })

            .state('/add-tag', {
                url: '/add-tag',
                templateUrl: "modules/add-tag/add-tag.html",
                resolve: {
                    data: function (ApiService) {
                        return ApiService.getTagResults();
                    }
                }
            })
            .state('/add-person', {
                url: '/add-person',
                templateUrl: "modules/add-person/add-person.html",
                resolve: {
                    data: function (ApiService) {
                        return ApiService.getPeopleResults();
                    }
                }
            });


        // If none of the above states are matched, use this as the fallback
        $urlRouterProvider
            .when("/home", "/character-detail")
            .otherwise('/character-detail');
    };
});
