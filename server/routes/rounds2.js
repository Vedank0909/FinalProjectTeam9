let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// define the user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User Model - User object
let player = require('../models/players')
let round = require('../models/rounds')

// define the game model
let tournament = require('../models/tournaments');

// create a function to check if the user is authenticated
function requireAuth(req, res, next) {
  // check if the user is logged in
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

/* GET home page. wildcard */
router.get('/:id', (req, res, next) => {
let id = req.params.id;
    round.find( (err, rounds) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('content/rounds2', {
        title: 'Rounds',
        rounds: rounds,
        pid:id,
        displayName: req.user ? req.user.displayName : ''
      });
    }
  });

});
router.post('/:id', requireAuth, (req, res, next) => {
  let id = req.params.id;
  // get a reference to the id from the url
 // let id2 = mongoose.Types.ObjectId.createFromHexString(req.params.rid);
 if(req.body.p1=="" && req.body.p2==""){
    let newround7 = round({
      "roundno": req.body.roundno,
      "matchno": req.body.matchno,
      "pname1": req.body.pname1,
      "pname2": req.body.pname2,
      "winner": req.body.winner,
      "tid": req.params.id,
      "_id": req.body.rid
    });
    console.log(req.body.rid);

    round.update({_id: req.body.rid}, newround7, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        console.log("Winner added for the round")
        res.redirect('/tournaments');
      }
    });
 }

 else{
   let id = req.params.id;
   console.log("done!!!!!");
    var newround8 = round({
      "roundno": req.body.roundno,
      "matchno": req.body.matchno,
      "pname1": req.body.p1,
      "pname2": req.body.p2,
      "winner": '',
      "tid": id,
    });

   round.create(newround8, (err, rounds) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        console.log("done!!!!!");
        res.redirect('/tournaments');

      }
    });
 }
});






/* GET contact page. */

module.exports = router;