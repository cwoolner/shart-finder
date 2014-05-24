/* global define, require */
define(function (require) {

    "use strict";

    describe('HeaderCtrl', function () {
        var angular = require('angular');
        var mocks = require('angular-mocks');
        var sut;

        beforeEach(mocks.module('navigation'));

        beforeEach(mocks.inject(function ($controller) {
            sut = $controller('HeaderCtrl');
        }));

        it('should create the Header controller', function () {
            expect(sut).toBeDefined();
        });
    });
});