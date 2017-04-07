let mongoose = require('mongoose');

// create a model class
let roundsSchema = mongoose.Schema({
    roundNo: Number,
    winnerTeam: String,
    tournamentname:String
   
},
{
  collection: "tournament"
});

module.exports = mongoose.model('tournament', tournamentSchema);