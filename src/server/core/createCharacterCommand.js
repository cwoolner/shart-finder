var CharacterModel = require('../model/characterModel');

function CreateCharacterCommand(){
  this.characterModel = CharacterModel;
}

CreateCharacterCommand.prototype.execute = function(characterToSave, cb){
  var self = this;

  var characterModelToSave = new self.characterModel(characterToSave);

  characterModelToSave.save(function(err, savedCharacter) {
    if(err){
      console.error("Error trying to save character:", err);
      return cb(err);
    }

    return cb(null, savedCharacter);
  });
};

module.exports = CreateCharacterCommand;
