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
      "pname": req.body.pname,
      "tname": req.body.tname,
      "tid": req.body.tid
    });

    player.create(newplayers, (err, players) => {
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