var CharacterModel = require('../model/characterModel');

function DeleteCharacterByIdQuery() {
  this.characterModel = CharacterModel;
};

DeleteCharacterByIdQuery.prototype.execute = function(characterId, cb) {
  var self = this;

  self.characterModel.remove({_id: characterId}, function(err) {
    if (err) {
      return cb(err);
    }

    return cb(null);
  });
};

module.exports = DeleteCharacterByIdQuery;
