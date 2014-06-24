/* global define */
define(function (require) {
    'use strict';

    function ApiService($q, $http) {

        // Require statements should be at the top
        var peopleStub = require("stubs/getPeople");
        var tagStub = require("stubs/getTags");
	var encountersStub = require("stubs/getEncounters");
	var charactersStub = require("stubs/getCharacters");

        var apiService = this;
	var appConfig = require("app-config");

        apiService.apiResults = {};

        apiService.addProject = function (proj) {
            console.log('Saving Project in Service', proj);

            var deferred = $q.defer();

            $http({
                method: "POST",
                url: "http://projectdb-dev.herokuapp.com/api/projects",
                data : proj
            }).
                success(function (data) {
                    deferred.resolve(data);
                }).
                error(function (error, status) {
                    console.log("An error has occurred adding a project");
                    console.log(error);
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        apiService.deleteProject = function (id) {
            console.log('Deleting ID in service', id);

            var deferred = $q.defer();

            $http({
                method: "DELETE",
                url: "http://projectdb-dev.herokuapp.com/api/projects/" + id
            }).
                success(function (data) {
                    deferred.resolve(data);
                }).
                error(function (error, status) {
                    console.log("An error has occurred deleting a project");
                    console.log(error);
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        apiService.formatResponse = function (rawResponse) {
            var parsed = JSON.parse(rawResponse);
            return parsed.data;
        };

        apiService.getProjectResults = function (apiString) {
            var deferred = $q.defer();

            $http({
                method: "GET",
                url: "http://projectdb-dev.herokuapp.com/api/projects",
                transformResponse: this.formatResponse
            }).success(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        };

        apiService.getCharacterResults = function() {
            var deferred = $q.defer();
            apiService.apiResults.characters = charactersStub.data;
            deferred.resolve(charactersStub.data);
            return deferred.promise;
        };

        apiService.getPeopleResults = function () {
            var deferred = $q.defer();
            apiService.apiResults.people = peopleStub.data;
            deferred.resolve(peopleStub.data);
            return deferred.promise;
        };

	apiService.getEncounterResults = function() {
            var deferred = $q.defer();
	    console.log('encountersStub.data: ' + encountersStub.data);
            apiService.apiResults.encounters = encountersStub.data;
            deferred.resolve(encountersStub.data);
            return deferred.promise;
        };

        apiService.getEncounterById = function (id) {
            var deferred = $q.defer();
            apiService.apiResults.encounters = encountersStub.data;
            deferred.resolve(encountersStub.data);
            return deferred.promise;
        };


        apiService.getTagResults = function () {
            var deferred = $q.defer();
            console.log("tagStub.data", tagStub.data);
            apiService.apiResults.tags = tagStub.data;
            deferred.resolve(tagStub.data);
            return deferred.promise;
        };

        apiService.addPerson = function (person) {
            var deferred = $q.defer();
            console.log("person to add:", person);
            //FIXME: Need to do something here.
            deferred.resolve("Person added");
            return deferred.promise;
        };

        apiService.addTag = function (tag) {
            var deferred = $q.defer();
            console.log("tag to add:", tag);
            //FIXME: Need to do something here.
            deferred.resolve("Tag added");
            return deferred.promise;
        };

	apiService.addCharacter = function (character) {
	    console.log("character to add:", character);

            var deferred = $q.defer();

            $http({
                method: "POST",
                url: appConfig.getApiURI()+"/character",
                data : character
            }).
                success(function (data) {
                    deferred.resolve(data);
                }).
                error(function (error, status) {
                    console.log("An error has occurred adding a character");
                    console.log(error);
                    deferred.reject(error);
                });

            return deferred.promise;
	};

        apiService.getAllPromises = function () {
            console.log("get all promises");
            var promises = {
                "people": this.getPeopleResults(),
                "tags": this.getTagResults(),
                "projects": this.getProjectResults(),
		"encounters": this.getEncounterResults(),
                "characters": this.getCharacterResults()
            };
	    console.log("promises.encounters: " + promises.encounters);
            return promises;
        };

        apiService.getAll = function () {
            var promises = this.getAllPromises();

            return $q.all(promises).then(function (data) {
                console.log("This is ALL the data...", data);
                apiService.apiResults.people = data.people;
                apiService.apiResults.tags = data.tags;
                apiService.apiResults.projects = data.projects;
                apiService.apiResults.characters = data.characters;
		apiService.apiResults.encounters = data.encounters;
		
            });

        };

        apiService.getById = function (type, id) {

            var deferred = $q.defer();

            apiService.getByType(type).then(function () {
		console.log("getByType");
                var foundElement = _.find(apiService.apiResults[type], function (result) {
                    return result._id === id;
                });
                deferred.resolve(foundElement);
            });

            return deferred.promise.then(function (data) {
		console.log(data);
                apiService.selectedResult = data;
            });
        };

        apiService.getByType = function (type) {

            var results,
            deferred;

            if (type) {
		console.log("type: " + type);
                if (type.toLowerCase() === "projects") {
                    results = apiService.getProjectResults();

                } else if (type.toLowerCase() === "tags") {
                    results = apiService.getTagResults();

                } else if (type.toLowerCase() === "people") {
                    results = apiService.getPeopleResults();

                } else if (type.toLowerCase() === "characters") {
                    results = apiService.getCharacterResults();
		} else if (type.toLowerCase() === "encounters") {
                    results = apiService.getEncounterResults();
                } else {
                    deferred = $q.defer();
                    deferred.resolve();
                    results = deferred.promise;
                }
            }

            return results.then(function (data) {
                console.log("resutls.then. apiResults["+type+"]");
                apiService.apiResults[type] = data;
            });
        };
    }

    return [
        '$q',
        '$http',
        ApiService
    ];

});
