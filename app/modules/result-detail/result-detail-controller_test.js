define(function (require) {

    "use strict";

    describe('ResultDetailCtrl', function () {
        var angular = require('angular');
        var mocks = require('angular-mocks');
        var resultDetail = require('modules/result-detail/result-detail');

        var sut;
        var $scope;
        var $q;

        var ApiServiceMock;

        beforeEach(function () {
            mocks.module(resultDetail.name);
        });

        beforeEach(mocks.module(function ($provide) {

            ApiServiceMock = {
                getByType: jasmine.createSpy("ApiService getByType")
            };

            $provide.value('$state', {
                transitionTo : jasmine.createSpy("$state transitionTo")
            });

            $provide.value('$stateParams', {
                "type" : "testType",
                "id" : "testId"
            });

            $provide.value('ApiService', ApiServiceMock);
        }));

        beforeEach(mocks.inject(function ($controller, _$rootScope_, _$q_) {

            $scope = _$rootScope_;
            $q = _$q_;

            ApiServiceMock.getById = function () {
                var deferred = $q.defer();
                deferred.resolve();
                return deferred.promise;
            };

            ApiServiceMock.deleteProject = function () {
                var deferred = $q.defer();
                deferred.resolve();
                return deferred.promise;
            };

            sut = $controller('ResultDetailCtrl', {
                $scope: $scope
            });
        }));

        it('should set the type from the routeParams type value', function () {
            expect(sut.type).toEqual("testType");
        });

        it('should set the id from the routeParams id value', function () {
            expect(sut.id).toEqual("testId");
        });

        it('should navigate back to search upon successful deletion of a project', function () {
            sut.deleteProject();

            // Run $scope.apply so that the deferreds are resolved/dispatched
            $scope.$apply();

            expect(sut.$state.transitionTo).toHaveBeenCalledWith("search");

        });
    });
});