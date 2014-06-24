define(function(require) {

    "use strict";

    describe('AddProjectCtrl', function () {

        var angular = require('angular');
        var mocks = require('angular-mocks');

        var addProject = require('modules/add-project/add-project');
        var $scope;

        var sut;

        beforeEach(mocks.module(addProject.name));

        beforeEach(mocks.module(function ($provide) {

            $provide.value('ApiService', {});
            $provide.value('$modal', {});
        }));
        
        beforeEach(mocks.inject(function ($controller, _$rootScope_) {

            $scope = _$rootScope_;

            sut = $controller('AddProjectCtrl', {
                $scope : $scope
            });
        }));


        it('should have tests here written by Carl', function () {
            expect(true).toBe(true);
        });
    });
});


