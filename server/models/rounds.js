let mongoose = require('mongoose');

// create a model class
let roundsSchema = mongoose.Schema({
    roundNo: Number,
    matchNo: Number,
    pname1: String,
    pname2:String,
    winner:String
   
},
{
  collection: "rounds"
});

module.exports = mongoose.model('rounds', roundsSchema);