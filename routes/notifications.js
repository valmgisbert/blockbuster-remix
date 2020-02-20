const express = require("express");
const notificationsRouter = express.Router();
const User = require("./../models/User");
const GameForRent = require("./../models/GameForRent");
const RentRequest = require("./../models/RentRequest");

notificationsRouter.get("/", (req, res) => {
  const myGamesPr = RentRequest.find({
    gameOwnerRef: req.session.currentUser._id
  }).populate("gameForRentRef").populate("gameRenterRef")

  const myRentsPr = RentRequest.find({
    gameRenterRef: req.session.currentUser._id
  }).populate("gameForRentRef").populate("gameOwnerRef")

  Promise.all([myGamesPr, myRentsPr])
    .then(rentData => {
      const data = {
        myGames: [],
        myRents: []
      };

      const myGames = rentData[0];
      myGames.forEach(rentform => {
        var mngDate = rentform.created_at;
        // below is to format date from created_at
        var month = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ][mngDate.getMonth()];
        var readableDate =
        month.slice(0,3) + " " + mngDate.getDate() + "th " + mngDate.getFullYear();
        rentform.readableDate = readableDate 
        console.log(rentform)
        // to reduce size of game
        if (rentform.gameForRentRef && rentform.gameForRentRef.title.length > 18) {
          rentform.gameForRentRef.title = rentform.gameForRentRef.title.slice(0,18) + "..."
        } 
        data.myGames.push({rentform, readableDate}); // passing data as well as the readable date variable
      });
      
      const myRents = rentData[1];
      myRents.forEach(rentform => {
        var mngDate = rentform.created_at;
        // below is to format date from created_at
        var month = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ][mngDate.getMonth()];
        var readableDate =
        month.slice(0,3) + " " + mngDate.getDate() + "th " + mngDate.getFullYear();
        rentform.readableDate = readableDate 
        // to reduce size of game
        if (rentform.gameForRentRef > 18) {
          rentform.gameForRentRef.title = rentform.gameForRentRef.title.slice(0,18) + "..."
        } 
        data.myRents.push({rentform, readableDate}); // passing data as well as the readable date variable
      });

      res.render("notifications", data);
    })
    .catch(err => console.log(err));
});

notificationsRouter.get("/success/:gameRentId", (req, res) => {
  const rentFormId = req.params.gameRentId
  console.log(rentFormId)
  RentRequest.findById(rentFormId)
  .populate("gameForRentRef").populate("gameOwnerRef").populate("gameRenterRef")
  .then( (data) => {
    data.addedMessage = "All your game are belong to us!"
    res.render("success", data)
    console.log(data)
  })
  .catch( (err) => console.log(err));
})

module.exports = notificationsRouter;
