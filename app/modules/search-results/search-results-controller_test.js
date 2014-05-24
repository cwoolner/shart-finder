/* global define, describe, beforeEach, it, spyOn, expect */
define(function (require) {

    "use strict";

    describe('SearchResultsCtrl', function () {
        var angular = require('angular');
        var mocks = require('angular-mocks');
        var searchResults = require('modules/search-results/search-results');

        var sut;
        var $scope;
        var $q;
        var SearchResultsServiceMock;

        var testTypeParam = "test";

        beforeEach(mocks.module('searchResults'));
        
        beforeEach(mocks.module(function ($provide) {
            $provide.value('$stateParams', {
                type: testTypeParam
            });
            $provide.value('ApiService', {
                apiResults : {
                    "test" : "value"
                }
            });
        }));

        beforeEach(mocks.inject(function (_$rootScope_, $controller) {
            $scope = _$rootScope_;
            sut = $controller('SearchResultsCtrl', {
                $scope: $scope
            });
        }));

        it('should read the type param and set it to a local type variable', function () {
            expect(sut.selectedType).toEqual(testTypeParam);
        });

        it('should set the results property to the value corresponding to the type from the service data if it exists', function () {
            expect(sut.results).toEqual("value");
        });

        it('should return true if results exist', function () {

            expect(sut.resultsExist()).toBe(true);
        });

    });
});
