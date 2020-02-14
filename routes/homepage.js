const express = require('express');
const homeRouter = express.Router();

//GET the search results
homeRouter.get('/game-search', (req, res, next) => {
  res.render('game-search-results');
}) 

//GET game rent-form CHECK!!
homeRouter.get('/game-search-results', (req, res, next) => {
  res.redirect('/rent-form')
})



homeRouter.get('/', (req, res, next) => {
  res.render('homepage');
})

module.exports = homeRouter;