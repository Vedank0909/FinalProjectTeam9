let mongoose = require('mongoose');

// create a model class
let tournamentSchema = mongoose.Schema({
    name: String,
    description: String,
    displayname: String,
    completed: String
   
},
{
  collection: "tournaments"
});

module.exports = mongoose.model('tournaments', tournamentSchema);