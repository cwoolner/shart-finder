define(function (require) {
    "use strict";

    describe('Format Array Filter', function () {


        var angular = require('angular');
        var mocks = require('angular-mocks');
        var search = require('form-utils/form-utils');

        var formatArrayFilter;

        beforeEach(module('FormUtils'));

        beforeEach(mocks.inject(function (_formatArrayFilter_) {
            formatArrayFilter = _formatArrayFilter_;
        }));

        it('should format an empty array to an empty string', function () {

            var filteredData = formatArrayFilter([]);

            expect(filteredData).toBe("");
        });

        it('should format undefined to an empty string', function () {

            var filteredData = formatArrayFilter(undefined);

            expect(filteredData).toBe("");
        });

        it('should format an array of one element with no delimiter', function () {

            var filteredData = formatArrayFilter(["item1"]);

            expect(filteredData).toBe("item1");
        });

        it('should format an array with a comma delimiter if no delimiter is specified', function () {

            var filteredData = formatArrayFilter(["item1", "item2"]);

            expect(filteredData).toBe("item1, item2");
        });

        it('should format an array with a specified delimiter', function () {

            var filteredData = formatArrayFilter(["item1", "item2"], "#");

            expect(filteredData).toBe("item1#item2");
        });
    });
});
