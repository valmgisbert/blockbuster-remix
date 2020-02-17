const express = require("express");
const notificationsRouter = express.Router();
const User = require("./../models/User");
const GameForRent = require("./../models/GameForRent");
const RentRequest = require("./../models/RentRequest");

notificationsRouter.get("/", (req, res) => {
  const myGamesPr = RentRequest.find({
    gameOwnerRef: req.session.currentUser._id
  });

  const myRentsPr = RentRequest.find({
    gameRenterRef: req.session.currentUser._id
  });

  Promise.all([myGamesPr, myRentsPr])
    .then(rentData => {
      const data = {
        myGames: [],
        myRents: []
      };

      const myGames = rentData[0];
      myGames.forEach(Rentform => {
        console.log(Rentform.gameForRentRef);
        data.myGames.push(Rentform);
      });

      const myRents = rentData[1];
      myRents.forEach(Rentform => {
        console.log(Rentform.gameForRentRef);
        data.myRents.push(Rentform);
      });

      res.render("notifications", data);
    })
    .catch(err => console.log(err));
});

module.exports = notificationsRouter;
