/* global define */
define(function (require) {
  'use strict';

  function ApiService($q, $http) {

    // Require statements should be at the top
    var encountersStub = require("stubs/getEncounters");
    var charactersStub = require("stubs/getCharacters");

    var apiService = this;
    var appConfig = require("app-config");

    apiService.apiResults = {};

    apiService.formatResponse = function (rawResponse) {
      var parsed = JSON.parse(rawResponse);
      return parsed.data;
    };

    apiService.getCharacterResults = function () {
      var deferred = $q.defer();
      apiService.apiResults.characters = charactersStub.data;
      deferred.resolve(charactersStub.data);
      return deferred.promise;
    };

    apiService.getEncounterResults = function () {
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

    apiService.addCharacter = function (character) {
      console.log("character to add:", character);

      var deferred = $q.defer();

      $http({
        method: "POST",
        url: appConfig.getApiURI() + "/character",
        data: character
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

    apiService.addCampaign = function (campaign) {
      console.log("campaign to add:", campaign);

      var deferred = $q.defer();

      $http({
        method: "POST",
        url: appConfig.getApiURI() + "/campaign",
        data: campaign
      }).
      success(function (data) {
        deferred.resolve(data);
      }).
      error(function (error, status) {
        console.log("An error has occurred adding a campaign");
        console.log(error);
        deferred.reject(error);
      });

      return deferred.promise;
    };

    apiService.getAllPromises = function () {
      console.log("get all promises");
      var promises = {
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
	if (type.toLowerCase() === "characters") {
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
        console.log("resutls.then. apiResults[" + type + "]");
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
