var mongoose = require('mongoose');

var characterSchema = mongoose.Schema({
  name: {type: String}
});

module.exports = mongoose.model('character', characterSchema);
