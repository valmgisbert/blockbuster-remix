const express = require('express');
const profileRouter = express.Router();

const User = require('./../models/User');
const GameForRent = require('./../models/GameForRent');
const http = require("https");

function videoGameRequest (game, platform) {
  var options = {
    "method": "GET",
    "hostname": "chicken-coop.p.rapidapi.com",
    "port": null,
    "path": `/games/${game}?platform=${platform}`,
    "headers": {
      "x-rapidapi-host": "chicken-coop.p.rapidapi.com",
      "x-rapidapi-key": "766f5f69famshfac367d02576848p1cf23djsn3e6a1483796e"
    }
  };
  
  var req = http.request(options, function (res) {
    var chunks = [];
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
      return body
    });
    return body
  });
  req.end();
  return body
  }
//POST profile edit
//GET profile edit

//GET to add game to profile page
profileRouter.get('/', (req, res) => {
  res.render('profile');
})

//POST to send to body profile
profileRouter.post('/', (req, res) => {
  const {title, platform, price, minDays, maxDays} = req.body;
  console.log('game', game);
  console.log('platform', platform);
  
  const videoGameFromApi = videoGameRequest(game, platform);
  console.log('videoGameFromApi', {videoGameFromApi});
  GameForRent.create({game, platform, price, minDays, maxDays})
  .then((game) => {
    res.redirect('/profile')
  })
  .catch( (err) => {
    res.render('profile', {errorMsg: 'There was an error creating the game. Please try again.'});
  })
});

//GET render profile
profileRouter.get('/', (req, res, next) => {
  res.render('profile')
})

module.exports = profileRouter;