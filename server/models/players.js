let mongoose = require('mongoose');

// create a model class
let playersSchema = mongoose.Schema({
    name: String,
    TeamName: String,
    TournamentName:String
   
},
{
  collection: "tournament"
});

module.exports = mongoose.model('tournament', playersSchema);