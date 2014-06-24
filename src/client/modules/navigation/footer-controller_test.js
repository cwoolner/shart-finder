/* global define, require */
define(function (require) {

    "use strict";

    describe('FooterCtrl', function () {
        var angular = require('angular');
        var mocks = require('angular-mocks');
        var navigation = require('modules/navigation/navigation');

        var sut;

        beforeEach(mocks.module('navigation'));

        beforeEach(mocks.inject(function ($controller) {
            sut = $controller('FooterCtrl');
        }));

        describe('footer properties', function () {

            it('should have a current year property that equals the current year', function () {
                expect(sut.currentYear).toEqual(new Date().getFullYear());
            });

        });
    });
});
