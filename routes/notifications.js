const express = require("express");
const notificationsRouter = express.Router();
const User = require("./../models/User");
const GameForRent = require("./../models/GameForRent");
const RentRequest = require("./../models/RentRequest");

notificationsRouter.get("/", (req, res) => {
  console.log('HELLOOOO');
  
  console.log('user id', req.session.currentUser._id);
  const userId = req.session.currentUser._id;

  const myGamesPr = RentRequest.find()
  .populate('gameForRentRef')
  .then(data => {
    console.log('DATA', data);
    res.render("notifications", {data});
  })
  .catch(err => console.log(err))
  //.populate('gameForRentRef');

  // const myRentsPr = RentRequest.find({
  //   gameRenterRef: req.session.currentUser._id
  // })
  // //.populate('gameForRentRef');

  // Promise.all([myGamesPr, myRentsPr])
  //   .then(rentData => {
  //     const data = {
  //       myGames: [],
  //       myRents: []
  //     };

  //     console.log('rentDATAAAA', rentData);
      

  //     const myGames = rentData[0];
  //     myGames.forEach(Rentform => {
  //       console.log('GAMEEEESSSS',Rentform.gameForRentRef);
  //       data.myGames.push(Rentform);
  //     });

  //     const myRents = rentData[1];
  //     myRents.forEach(Rentform => {
  //       console.log(Rentform.gameForRentRef);
  //       data.myRents.push(Rentform);
  //     });

  //     res.render("notifications", data);
  //   })
  //   .catch(err => console.log(err));
  
});

module.exports = notificationsRouter;
