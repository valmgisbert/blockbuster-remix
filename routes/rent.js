const express = require('express');
const rentRouter = express.Router();

const User = require('./../models/User');
const RentRequest = require('./../models/RentRequest');
const GameForRent = require('./../models/GameForRent');

rentRouter.post('/', (req, res, next) => {
  res.render('success');
})

//GET rent form ADD THE ID 
rentRouter.get('/', (req, res, next) => {
  res.render('rent-form');
})

module.exports = rentRouter;