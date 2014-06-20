var CharacterModel = require('../model/characterModel');

function FetchAllCharactersQuery() {
  this.characterModel = CharacterModel;
};

FetchAllCharactersQuery.prototype.execute = function(cb) {
  var self = this;

  self.characterModel.find(function(err, characters) {
    if (err) {
      return cb(err);
    }

    return cb(null, characters);
  });
};

module.exports = FetchAllCharactersQuery;
