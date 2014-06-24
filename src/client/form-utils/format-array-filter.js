define(function () {
    'use strict';

    // Formats an array by joining it together using a delimiter.  If no delimiter is specified, default is ", "
    function FormatArrayFilter() {
        return function (input, delimiter) {
            delimiter = delimiter || ", ";
            return input ? input.join(delimiter) : "";
        };
    }

    return [FormatArrayFilter];

});
