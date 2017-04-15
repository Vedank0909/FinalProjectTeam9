let mongoose = require('mongoose');
let Schema = mongoose.Schema; //alias for mongoose Schema
// create a model class
let playersSchema = mongoose.Schema({
    pname1: String,
    pname2: String,
    pname3: String,
    pname4: String,
    pname5: String,
    pname6: String,
    pname7: String,
    pname8: String,
    tid:String
   
},
{
  collection: "players"
});

module.exports = mongoose.model('players', playersSchema);