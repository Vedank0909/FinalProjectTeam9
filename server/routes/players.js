let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// define the user model
let UserModel = require('../models/users');
let User = UserModel.User; // alias for User Model - User object
let player = require('../models/players')

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
    player.find( (err, players) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('content/playerlist', {
        title: 'PlayerList',
        players: players,
        pid:id,
        displayName: req.user ? req.user.displayName : ''
      });
    }
  });

});

/* GET contact page. */

module.exports = router;