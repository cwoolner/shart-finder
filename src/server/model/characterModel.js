var mongoose = require('mongoose');

var characterSchema = mongoose.Schema({
  "name": {type: String},
  "player": {type: String},
  "sex": {type: String},
  "race": {type: String},
  "class": {type: String},
  "level": {type: String},
  "alignment": {type: String},
  "age": {type: String},
  "height": {type: String},
  "weight": {type: String},
  "experience": {type: String}
});

module.exports = mongoose.model('character', characterSchema);
