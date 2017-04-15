let mongoose = require('mongoose');

// create a model class
let roundsSchema = mongoose.Schema({
    roundno: Number,
    matchno: Number,
    pname1: String,
    pname2:String,
    winner:String,
    tid:String
   
},
{
  collection: "rounds"
});

module.exports = mongoose.model('rounds', roundsSchema);