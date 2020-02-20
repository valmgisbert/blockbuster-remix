const express = require("express");
const homeRouter = express.Router();

const GameForRent = require("./../models/GameForRent");
const User = require("./../models/User");
const RentRequest = require("./../models/RentRequest");
const axios = require("axios");

//GET the search results
homeRouter.post("/game-search", (req, res, next) => {
  const { title } = req.body;

  GameForRent.find({ title: { $regex: new RegExp(title), $options: "i" }, isAvailable : true, gameOwnerRef: { $ne: req.session.currentUser._id } }) //IT WORKS!! :D
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
    const ownerInfoPr = GameForRent.findById(gameId).populate("gameOwnerRef")
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
        console.log("game&owner", data[1])
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
          price: data[1].price,
          minDays: data[1].minDays,
          maxDays: data[1].maxDays,
          ownerNickname: data[1].gameOwnerRef.nickname,
          ownerNeighborhood: data[1].gameOwnerRef.address.neighborhood
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
homeRouter.post("/success/:gameId/:gameOwnerId", (req, res, next) => {
const { totalDays, totalPrice } = req.body;

  const createRentReqPr = RentRequest.create({
    gameForRentRef: req.params.gameId,
    gameOwnerRef: req.params.gameOwnerId,
    gameRenterRef: req.session.currentUser._id,
    totalDays,
    totalPrice
  })
  const gameFlagPr = GameForRent.findByIdAndUpdate(req.params.gameId, { isAvailable: false })
  Promise.all([createRentReqPr, gameFlagPr])
    .then(createdRentRequest => {
      return RentRequest.findById(createdRentRequest[0]._id)
        .populate("gameForRentRef")
        .populate("gameOwnerRef")
        .populate("gameRenterRef");
    })
    .then(rentRequest => {
      rentRequest.addedMessage = "SUCCESS!"
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
