var express = require("express");
var signupRouter = express.Router();
const User = require("./../models/User");

const bcrypt = require("bcrypt");
// const zxcvbn = require("zxcvbn");
const saltRounds = 10;

signupRouter.post("/", (req, res, next) => {
  const { email, password, repeatPassword, fullName, birthday, gender, address, phone, typeOfCard, cardNumber, expDate, cvv  } = req.body;

  if (email === "" || password === "") {
    res.render("signup", {
      errorMessage: "Username and Password are required"
    });
    return;
  }
  if (password !== repeatPassword) {
      res.render("signup", {
        errorMessage: "Password and Repeat Password do not match"
      }); 
      return;
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        res.render("signup", {
          errorMessage: "Username already exists"
        });
        return;
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      User.create(
        {
            email,
            password: hashedPassword,
            fullName,
            birthday,
            gender,
            address,
            phone,
            cardInfo: {
                typeOfCard,
                cardNumber,
                expDate,
                cvv,
            }
            // gamesForRent:[]
        }
      )
        .then(createUser => res.redirect("/"))
        .catch(err => {
          res.render("signup", {
            errorMessage: "Error while creating new user."
          });
        });
    })
    .catch(err => console.log(err));
});

//GET /login
signupRouter.get("/", (req, res) => {
  res.render("signup");
});

module.exports = signupRouter;
