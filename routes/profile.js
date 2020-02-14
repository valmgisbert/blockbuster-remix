const express = require('express');
const profileRouter = express.Router();

const User = require('./../models/User');
const GameForRent = require('./../models/GameForRent');

//POST profile edit
//GET profile edit

//GET to add game to profile page
profileRouter.get('/add-game', (req, res) => {
  res.render('user-profile/add-game');
})

//POST to send to body profile
profileRouter.post('/add-game', (req, res) => {
  const {title, console, price, maxDays} = req.body;
  GameForRent.create({title, console, price, maxDays})
  .then((game) => {
    res.redirect('/user-profile')
  })
  .catch( (err) => {
    res.render('user-profile/add-game', {errorMsg: 'There was an error creating the game. Please try again.'});
  })
});

//GET render profile
profileRouter.get('/', (req, res, next) => {
  res.render('user-profile')
})

module.exports = profileRouter;