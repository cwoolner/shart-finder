var FetchAllCharactersQuery = require('../core/fetchAllCharactersQuery');
var FetchCharacterByIdQuery = require('../core/fetchCharacterByIdQuery');
var CreateCharacterCommand = require('../core/createCharacterCommand');
var UpdateCharacterCommand = require('../core/updateCharacterCommand');
var DeleteCharacterByIdCommand = require('../core/deleteCharacterByIdCommand');

function CharacterController() {
  this.fetchAllCharactersQuery = new FetchAllCharactersQuery();
  this.fetchCharacterByIdQuery = new FetchCharacterByIdQuery();
  this.createCharacterCommand = new CreateCharacterCommand();
  this.updateCharacterCommand = new UpdateCharacterCommand();
  this.deleteCharacterByIdCommand = new DeleteCharacterByIdCommand();
}

CharacterController.prototype.all = function(req, res) {
  var self = this;

  self.fetchAllCharactersQuery.execute(function(err, characters) {
    if (err) {
      return res.json(500, 'Internal Server Error');
    }

    return res.json(200, {data: characters});
  });
};

CharacterController.prototype.single = function(req, res) {
  var self = this;

  self.fetchCharacterByIdQuery.execute(req.params.id, function(err, character) {
    if (err) {
      return res.json(500, 'Internal Server Error');
    }

    return res.json(200, {data: character});
  });
};

CharacterController.prototype.add = function(req, res) {
  var self = this;

  self.createCharacterCommand.execute(req.body, function(err, character) {
    if (err) {
      return self.errorResponse.json(res, err);
    }

    res.location('/character/' + character._id);
    return res.json(201, { data: character });
  });
};

CharacterController.prototype.update = function(req, res) {
  var self = this;

  self.updateCharacterCommand.execute(req.params.id, req.body, function(err, character) {
    if (err) {
      return self.errorResponse.json(res, err);
    }

    return res.json(204, 'No Content');
  });
};

CharacterController.prototype.delete = function(req, res) {
  var self = this;

  self.deleteCharacterByIdCommand.execute(req.params.id, function(err, character) {
    if (err) {
      return res.json(500, 'Internal Server Error');
    }

    return res.json(204, 'No Content');
  });
};

module.exports = CharacterController;
