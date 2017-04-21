// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// define the user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User Model - User object

// define the game model
let tournament = require('../models/tournaments');
let player = require('../models/players')
let round = require('../models/rounds')

// create a function to check if the user is authenticated
function requireAuth(req, res, next) {
  // check if the user is logged in
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
}

/* GET games List page. READ */
router.get('/', requireAuth, (req, res, next) => {
  // find all games in the games collection
  tournament.find( (err, tournaments) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('content/tournament', {
        title: 'Tournament',
        tournaments: tournaments,
        displayName: req.user ? req.user.displayName : ''
      });
    }
  });

});

//  GET the Game Details page in order to add a new Game
router.get('/add', requireAuth, (req, res, next) => {
  res.render('content/details', {
    title: "Details",
    tournaments: '',
    displayName: req.user ? req.user.displayName : ''
  });
});

// POST process the Game Details page and create a new Game - CREATE
router.post('/add', requireAuth, (req, res, next) => {

    let newTournament = tournament({
      "name": req.body.name,
      "description": req.body.description,
      "displayname": req.user ? req.user.displayName : '',
      "completed": req.body.completed
    });

    tournament.create(newTournament, (err, tournaments) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        res.redirect('/tournaments');
      }
    });
});


// GET the Game Details page in order to edit a new Game
router.get('/:id', requireAuth, (req, res, next) => {

    try {
      // get a reference to the id from the url
      let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

        // find one game by its id
      tournament.findById(id, (err, tournaments) => {
        if(err) {
          console.log(err);
          res.end(error);
        } else {
          // show the game details view
          res.render('content/player', {
              title: 'Tournament Details',
              tournaments: tournaments,
              displayname: req.user.displayName
          });
        }
      });
    } catch (err) {
      console.log(err);
      res.redirect('/errors/404');
    }
});

// POST - process the information passed from the details form and update the document
router.post('/:id', requireAuth, (req, res, next) => {
  let id = req.params.id;
  // get a reference to the id from the url
    let newplayers = player({
      "pname1": req.body.pname1,
      "pname2": req.body.pname2,
      "pname3": req.body.pname3,
      "pname4": req.body.pname4,
      "pname5": req.body.pname5,
      "pname6": req.body.pname6,
      "pname7": req.body.pname7,
      "pname8": req.body.pname8,
      "tid": req.body.tid
    });

    player.create(newplayers, (err, players) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        console.log("Player list created");
      }
    });

 let newround11 = round({
      "roundno": '1',
      "matchno": '1',
      "pname1": req.body.pname1,
      "pname2": req.body.pname2,
      "winner": '',
      "tid": req.body.tid
    });

round.create(newround11, (err, rounds) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        console.log("Player list created");
      }
    });

    let newround12 = round({
      "roundno": '1',
      "matchno": '2',
      "pname1": req.body.pname3,
      "pname2": req.body.pname4,
      "winner": '',
      "tid": req.body.tid
    });

round.create(newround12, (err, rounds) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
       console.log("Player list created");
      }
    });

    let newround13 = round({
      "roundno": '1',
      "matchno": '3',
      "pname1": req.body.pname5,
      "pname2": req.body.pname6,
      "winner": '',
      "tid": req.body.tid
    });

round.create(newround13, (err, rounds) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        console.log("Player list created");
      }
    });

    let newround14 = round({
      "roundno": '1',
      "matchno": '4',
      "pname1": req.body.pname7,
      "pname2": req.body.pname8,
      "winner": '',
      "tid": req.body.tid
    });

round.create(newround14, (err, rounds) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        res.redirect('/tournaments');
      }
    });

  
});


router.get('/pl', (req, res, next) => {
  res.render('content/contact', {
    title: 'Active Tournament',
    displayName: req.user ? req.user.displayName : ''
   });
});






// GET - process the delete by user id
router.get('/delete/:id', requireAuth, (req, res, next) => {
  // get a reference to the id from the url
    let id = req.params.id;

    tournament.remove({_id: id}, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the games list
        res.redirect('/tournaments');
      }
    });
});


module.exports = router;