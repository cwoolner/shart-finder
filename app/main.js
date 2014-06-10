/* global define, require */
require.config({
    baseUrl: "",
    paths: {
        "jquery": "bower_components/jquery/dist/jquery.min",
        "angular": "bower_components/angular/angular",
        "angular-route": "bower_components/angular-route/angular-route",
        "angular-bootstrap": "bower_components/angular-bootstrap/ui-bootstrap-tpls.min",
        "angular-ui-router": "bower_components/angular-ui-router/release/angular-ui-router",
        "lodash": "bower_components/lodash/dist/lodash.min"
    },

    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-bootstrap': {
            deps: ['angular']
        },
        'angular-ui-router': {
            deps: ['angular']
        }

    },
    priority: [
        "angular"
    ]
});

define(function (require) {
    "use strict";

    var jQuery = require('jquery');
    var angular = require('angular');
    var _ = require('lodash');
    var angularBootstrap = require('angular-bootstrap');
    var uiRouter = require('angular-ui-router');
    var navigation = require('modules/navigation/navigation');
    var api = require('api/api');
    var addProject = require('modules/add-project/add-project');
    var addTag = require('modules/add-tag/add-tag');
    var addPerson = require('modules/add-person/add-person');
    var search = require('modules/search/search');
    var searchResults = require('modules/search-results/search-results');
    var resultDetail = require('modules/result-detail/result-detail');
    var encounter = require('modules/encounter/encounter');
    var characterDetail = require('modules/character-detail/character-detail');
    var landing = require('modules/landing/landing');
    var formUtils = require('form-utils/form-utils');
    var routerConfig = require('router-config');

    var app = angular.module("pshartFinder", [
        'ui.bootstrap',
        'ui.router',
        navigation.name,
        api.name,
        addProject.name,
        addTag.name,
        addPerson.name,
        search.name,
        searchResults.name,
        resultDetail.name,
        encounter.name,
        characterDetail.name,
	landing.name,
        formUtils.name])

        .config(routerConfig);

    angular.bootstrap(document.getElementsByTagName('body')[0], ['pshartFinder']);
});
