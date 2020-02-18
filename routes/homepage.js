const express = require('express');
const homeRouter = express.Router();

const GameForRent = require('./../models/GameForRent');
const User = require('./../models/User');
const RentRequest = require('./../models/RentRequest');
const axios = require("axios");


//GET the search results
homeRouter.post('/game-search', (req, res, next) => {
  const {title} = req.body;
  console.log(req.body);
  
  GameForRent.find({"title": { $regex: new RegExp(title), $options: 'i' } } ) //IT WORKS!! :D
    .then((games) => {
      const searchResults = games;
      res.render('game-search-results', {searchResults})
    })
    .catch(err => console.log('There was an error searching for the game', err))
}) 

//GET rent form ADD THE ID 
homeRouter.get('/rent-form/:title/:platform/:gameId/:gameOwnerRef', (req, res, next) => {
  const title = req.params.title;
  const platform = req.params.platform;
  const gameId = req.params.gameId;
  const gameOwnerId = req.params.gameOwnerRef;

  // to get response from videogame DB API to get the data for the game rent form
  axios({
    method: "GET",
    url: `https://chicken-coop.p.rapidapi.com/games/${title}`,
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "chicken-coop.p.rapidapi.com",
      "x-rapidapi-key": process.env.CLIENT_KEY
    },
    params: {
      platform: `${platform}`
    }
  })

  .then( (data) => {
    const {title, description, releaseDate, genre, image, score, publisher, rating} = data.data.result;
    const gameData = {
      title, platform, description, releaseDate, genre, image, score, publisher, rating, gameId, gameOwnerId
    }
    console.log("data", gameData);
    res.render('rent-form', gameData)})
  .catch( (err) => console.log('There was an error loading the rent form', err));
})

//GET success page
homeRouter.get('/success/:gameId/:gameOwnerId', (req, res, next) => {
  const createReqPr = RentRequest.create({
    gameForRentRef: req.params.gameId, 
    gameOwnerRef: req.params.gameOwnerId, 
    gameRenterRef: req.session.currentUser._id
  })
  const findGamePr = GameForRent.findById(req.params.gameId)
  const findOwnerPr = User.findById(req.params.gameOwnerId)
  Promise.all([createReqPr, findGamePr, findOwnerPr])
    .then( (data) => {
      const successData = {
        gameInfo: data[1],
        ownerInfo: data[2],
      }
      res.render('success', successData);
      console.log(data)})
    .catch( (err) => console.log(err));
})

//GET render the homepage
homeRouter.get('/', (req, res, next) => {
  res.render('homepage');
})

module.exports = homeRouter;