var _ = require('lodash');
var CharacterModel = require('../model/characterModel');

function UpdateCharacterCommand(){
  this.characterModel = CharacterModel;
}

UpdateCharacterCommand.prototype.execute = function(id, characterToUpdate, cb){
  var self = this;

  self.characterModel.findOne({ _id: id }, function(err, characterModelToUpdate){
    if(err){
      console.error("Error finding character to update", err);
      return cb(err);
    }

    _.extend(characterModelToUpdate, characterToUpdate);

    characterModelToUpdate.save(function(err, saved){
      if(err){
        console.error('Error trying to update character', saved, err);
        return cb(err);
      }

      return cb(null);
    });
  });

};

module.exports = UpdateCharacterCommand;
