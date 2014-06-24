/* global define, describe, beforeEach, it, spyOn, expect */
define(function (require) {

    "use strict";

    describe('Api Services', function () {
        var angular = require('angular');
        var mocks = require('angular-mocks');
        var api = require('api/api');

        var sut;

        describe('Api Service', function () {
            var $httpBackend;
            var $q;
            var $rootScope;

            // Create the module
            beforeEach(mocks.module('api'));

            beforeEach(mocks.inject(function (_$rootScope_, _$httpBackend_, _$q_, ApiService) {
                sut = ApiService;
                $httpBackend = _$httpBackend_;
                $q = _$q_;
                $rootScope = _$rootScope_;
            }));


            describe('formatResponse', function () {

            });

            describe('getAllPromises', function () {

            });

            describe('getAll', function () {

                it('should call getAllPromises', function () {
                    spyOn(sut, 'getAllPromises');
                    sut.getAll();
                    expect(sut.getAllPromises).toHaveBeenCalled();
                });
              
            });
        });

    });

});
