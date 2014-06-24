/* global define, describe, beforeEach, it, spyOn, expect */
define(function (require) {

    "use strict";

    describe('SearchCtrl', function () {
        var angular = require('angular');
        var mocks = require('angular-mocks');
        var search = require('modules/search/search');

        var sut;
        var $rootScope;
        var ApiServiceMock;

        beforeEach(mocks.module(search.name));

        beforeEach(mocks.module(function ($provide) {

            ApiServiceMock = jasmine.createSpyObj("ApiServiceMock", [
                'getAll',
                'getProjects',
                'getPeople',
                'getTags'
            ]);

            ApiServiceMock.apiResults = {
                "projects": ["projectItem1"],
                "people": ["peopleItem1"],
                "tags": ["tagsItem1"]
            };

            $provide.value('ApiService', ApiServiceMock);

            $provide.value('$state', {});
        }));

        beforeEach(mocks.inject(function (_$rootScope_, $controller) {
            $rootScope = _$rootScope_;
            sut = $controller('SearchCtrl', {
                $scope: $rootScope
            });
        }));

        describe('getGroup', function () {

            var resultData = [
                { title: 'Projects', content: 'Projects', items: [ 'projectItem1' ], isOpen: true },
                { title: 'Tags', content: 'Tags', items: [ 'tagsItem1' ], isOpen: true },
                { title: 'People', content: 'People', items: [ 'peopleItem1' ], isOpen: true }
            ];
            it('should call build the result data correctly with data from the service', function () {

                expect(sut.groups).toEqual(resultData);
            });

            it('should set the correct title when getGroup is called', function () {

                var property = "Test",
                    results = sut.getGroup({
                        "test": ["test results"]
                    });
                expect(results(property).title).toEqual(property);
            });

            it('should set the correct content when getGroup is called', function () {
                var property = "Test",
                    results = sut.getGroup({
                        "test": ["test results"]
                    });
                expect(results(property).content).toEqual(property);
            });

            it('should return an empty items array if the property does not exist in the data object passed to getGroup function', function () {
                var property = "Test",
                    results = sut.getGroup({
                        "notTest": ["test results"]
                    });
                expect(results(property).items.length).toEqual(0);
            });

            it('should return an empty items array if no data is passed to getGroups function', function () {
                var property = "Test",
                    results = sut.getGroup();
                expect(results(property).items.length).toEqual(0);
            });

            it('should return an empty items array if no property is passed to getGroups function', function () {
                var results = sut.getGroup("Test");
                expect(results().items.length).toEqual(0);
            });

            it('should return an empty items array if an empty object is passed to getGroups function', function () {

                var results = sut.getGroup({});
                expect(results().items.length).toEqual(0);
            });

        });
    });
});
