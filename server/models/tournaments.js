let mongoose = require('mongoose');

// create a model class
let tournamentSchema = mongoose.Schema({
    name: String,
    description: String
   
},
{
  collection: "tournaments"
});

module.exports = mongoose.model('tournaments', tournamentSchema);