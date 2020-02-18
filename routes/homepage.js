const express = require("express");
const homeRouter = express.Router();

const GameForRent = require("./../models/GameForRent");
const User = require("./../models/User");
const RentRequest = require("./../models/RentRequest");
const axios = require("axios");

//GET the search results
homeRouter.post("/game-search", (req, res, next) => {
  const { title } = req.body;

  GameForRent.find({ title: { $regex: new RegExp(title), $options: "i" } }) //IT WORKS!! :D
    .then(games => {
      const searchResults = games;
      res.render("game-search-results", { searchResults });
    })
    .catch(err =>
      console.log("There was an error searching for the game", err)
    );
});

//GET rent form ADD THE ID
homeRouter.get(
  "/rent-form/:title/:platform/:gameId/:gameOwnerRef",
  (req, res, next) => {
    const title = req.params.title;
    const platform = req.params.platform;
    const gameId = req.params.gameId;
    const gameOwnerId = req.params.gameOwnerRef;

    // to get owner info for basic info showing in rent form
    const ownerInfoPr = User.findById(gameOwnerId)
    // to get response from videogame DB API to get the data for the game rent form
    const apiInfoPr = axios({
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
    Promise.all([apiInfoPr, ownerInfoPr])
      .then(data => {
        console.log(data[1])
        const {
          title,
          description,
          releaseDate,
          genre,
          image,
          score,
          publisher,
          rating
        } = data[0].data.result;
        const gameData = {
          title,
          platform,
          description,
          releaseDate,
          genre,
          image,
          score,
          publisher,
          rating,
          gameId,
          gameOwnerId,
          ownerNickname: data[1].nickname,
          ownerNeighborhood: data[1].address.neighborhood
        };
        console.log("data", gameData);
        res.render("rent-form", gameData);
      })
      .catch(err =>
        console.log("There was an error loading the rent form", err)
      );
  }
);

//GET success page
homeRouter.get("/success/:gameId/:gameOwnerId", (req, res, next) => {
  RentRequest.create({
    gameForRentRef: req.params.gameId,
    gameOwnerRef: req.params.gameOwnerId,
    gameRenterRef: req.session.currentUser._id
  })
    .then(createdRentRequest => {
      console.log(createdRentRequest);
      return RentRequest.findById(createdRentRequest._id)
        .populate("gameForRentRef")
        .populate("gameOwnerRef")
        .populate("gameRenterRef");
    })
    .then(rentRequest => {
      res.render("success", rentRequest);
      console.log(rentRequest);
    })
    .catch(err => console.log(err));
});

//GET render the homepage
homeRouter.get("/", (req, res, next) => {
  res.render("homepage");
});

module.exports = homeRouter;
