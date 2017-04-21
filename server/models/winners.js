let mongoose = require('mongoose');

// create a model class
let winnersSchema = mongoose.Schema({
    winner1: String,
    winner2: String,
    winner3: String,
    winner4: String,
    winner5: String,
    winner6: String,
    winner7: String
   
},
{
  collection: "winners"
});

module.exports = mongoose.model('winners', roundsSchema);