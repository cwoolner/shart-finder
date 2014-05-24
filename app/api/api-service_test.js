/* global define, describe, beforeEach, it, spyOn, expect */
define(function (require) {

    "use strict";

    describe('Api Services', function () {
        var angular = require('angular');
        var mocks = require('angular-mocks');
        var api = require('api/api');
        var GetPeopleStub = require('stubs/getPeople');
        var GetTagsStub = require('stubs/getTags');
        var GetProjectsStub = require('stubs/getProjects');

        var sut;

        describe('Api Service', function () {
            var $httpBackend;
            var $q;
            var $rootScope;
            var getProjectStub;
            var getTagsStub;
            var getPeopleStub;

            // Create the module
            beforeEach(mocks.module('api'));

            beforeEach(mocks.inject(function (_$rootScope_, _$httpBackend_, _$q_, ApiService) {
                sut = ApiService;
                getProjectStub = angular.copy(GetProjectsStub);
                getTagsStub = angular.copy(GetTagsStub);
                getPeopleStub = angular.copy(GetPeopleStub);
                $httpBackend = _$httpBackend_;
                $q = _$q_;
                $rootScope = _$rootScope_;
            }));


            describe('formatResponse', function () {

                it('should take care of extracting necessary data for projects', function () {
                    var results = sut.formatResponse(JSON.stringify(getProjectStub));
                    expect(results).toEqual(getProjectStub.data);
                });

                it('should take care of extracting necessary data for tags', function () {
                    var results = sut.formatResponse(JSON.stringify(getTagsStub));
                    expect(results).toEqual(getTagsStub.data);
                });

                it('should take care of extracting necessary data for people', function () {
                    var results = sut.formatResponse(JSON.stringify(getPeopleStub));
                    expect(results).toEqual(getPeopleStub.data);
                });

            });

            describe('getAllPromises', function () {

                it('should call getPeopleResults', function () {
                    spyOn(sut, "getPeopleResults");
                    sut.getAllPromises();
                    expect(sut.getPeopleResults).toHaveBeenCalled();
                });

                it('should call getTagResults', function () {
                    spyOn(sut, "getTagResults");
                    sut.getAllPromises();
                    expect(sut.getTagResults).toHaveBeenCalled();
                });

                it('should call getProjectResults', function () {
                    spyOn(sut, "getProjectResults");
                    sut.getAllPromises();
                    expect(sut.getProjectResults).toHaveBeenCalled();
                });

            });

            describe('getAll', function () {

                it('should call getAllPromises', function () {
                    spyOn(sut, 'getAllPromises');
                    sut.getAll();
                    expect(sut.getAllPromises).toHaveBeenCalled();
                });

                it('should set the api results property', function () {
                    var getTagResultsPromise = $q.defer();
                    var apiResultsMock = {
                        'people': ['people results mock'],
                        'tags': ['tags results mock'],
                        'projects': ['projects results mock']
                    };
                    spyOn(sut, 'getAllPromises').and.returnValue(getTagResultsPromise.promise);
                    sut.getAll();
                    getTagResultsPromise.resolve(apiResultsMock);
                    $rootScope.$apply(); // Promises resolve on a scope $apply the $rootScope will take care of this for us since the $promise will be held there.
                    expect(sut.apiResults).toEqual(apiResultsMock);
                });

            });
        });

    });

});