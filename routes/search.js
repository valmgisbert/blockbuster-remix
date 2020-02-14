const express = require('express');
const searchRouter = express.Router();

//GET the search results
searchRouter.get('/game-search', (req, res, next) => {
  res.render('game-search-results');
}) 

//GET game rent-form CHECK!!
searchRouter.get('/game-search-results', (req, res, next) => {
  res.redirect('/rent-form')
})



searchRouter.get('/', (req, res, next) => {
  res.render('homepage');
})

module.exports = searchRouter;