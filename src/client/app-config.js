/* global define, require, _ */
define([], function () {

    'use strict';



    return  {

        isLocalAPI: function(){
            //If you have API running locally with MongoDB, you can add a query parameter ?localAPI=true right before the #
            var search = location.search.substring(1),
                searchObj = search?JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}'):{};

            return (searchObj.localAPI==="true") || false;
        },

        getApiURI : function(){
            return "http://localhost:9002";
        }

    };
});
