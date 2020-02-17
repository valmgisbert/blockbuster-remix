const express = require('express');
const homeRouter = express.Router();

const GameForRent = require('./../models/GameForRent');


//GET the search results
homeRouter.post('/game-search', (req, res, next) => {
  const {title} = req.body;
  console.log(req.body);
  
  GameForRent.find({"title": { $regex: new RegExp(title), $options: 'i' } } ) // IT WORKS!! :D
    .then((games) => {
      console.log('games', games);
      
      const searchResults = games;
      res.render('game-search-results', {searchResults})
    })
    .catch(err => console.log('There was an error searching for the game', err))
}) 




//GET game rent-form CHECK!!
homeRouter.get('/game-search-results', (req, res, next) => {
  res.redirect('/rent-form')
})



homeRouter.get('/', (req, res, next) => {
  res.render('homepage');
})

module.exports = homeRouter;