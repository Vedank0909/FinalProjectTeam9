let mongoose = require('mongoose');
let Schema = mongoose.Schema; //alias for mongoose Schema
// create a model class
let playersSchema = mongoose.Schema({
    pname: String,
    tname: String,
    tid:String
   
},
{
  collection: "players"
});

module.exports = mongoose.model('players', playersSchema);