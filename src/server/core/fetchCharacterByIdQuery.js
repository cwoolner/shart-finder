var CharacterModel = require('../model/characterModel');

function FetchCharacterByIdQuery() {
  this.characterModel = CharacterModel;
};

FetchCharacterByIdQuery.prototype.execute = function(characterId, cb) {
  var self = this;

  self.characterModel.findOne({_id: characterId}, function(err, character) {
    if (err) {
      return cb(err);
    }

    return cb(null, character);
  });
};

module.exports = FetchCharacterByIdQuery;
