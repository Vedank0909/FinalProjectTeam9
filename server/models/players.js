let mongoose = require('mongoose');

// create a model class
let playersSchema = mongoose.Schema({
    name: String,
    teamname: String,
    tournamentname:String
   
},
{
  collection: "tournament"
});

module.exports = mongoose.model('tournament', playersSchema);