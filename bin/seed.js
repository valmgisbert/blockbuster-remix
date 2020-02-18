require('dotenv').config();

const mongoose = require("mongoose");
const User = require("../models/User");

const users = [
    {
        email: "bananarama@gmail.com",
        password: "12345678",
        fullName: "Bob Banana",
        birthday: "1986-12-10",
        gender: "M",
        address: "Ironhack Barcelona",
        phone: "555666777",
        cardInfo: {
            typeOfCard: "Visa",
            cardNumber: 1122334455667788,
            expDate: "2022-08-02",
            cvv: 123,
        }
    },
    {
        email: "owner@gmail.com",
        password: "12345678",
        fullName: "Joe Guacamole",
        birthday: "1977-08-05",
        gender: "M",
        address: "Sonora Café",
        phone: "478394878",
        cardInfo: {
            typeOfCard: "MasterCard",
            cardNumber: 8877665544332211,
            expDate: "2023-11-11",
            cvv: 234,
        }
    },
    {
        email: "renter@gmail.com",
        password: "12345678",
        fullName: "Ned Flounders",
        birthday: "1979-01-04",
        gender: "Other",
        address: "The Atico",
        phone: "525656787",
        cardInfo: {
            typeOfCard: "Visa",
            cardNumber: 6677883647676,
            expDate: "2023-12-12",
            cvv: 345,
        }
    },
];

// SEED SEQUENCE

const dbName = "Blockbuster-Remix-DB"

// 1. ESTABLISH CONNECTION
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then (() => {
      // 2. CREATE DOCUMENTS FROM THE ARRAY OF celebrities
      const pr = User.create(users);
      return pr;
  })
  .then(createdUsers => {
      console.log(`Created ${createdUsers.length} user files`);

  // 3. CLOSE THE DB CONNECTION
    const pr = mongoose.connection.close();
    return pr;
})
.then(() => console.log("Connection closed!"))
.catch(err => console.error("Error connecting to mongo", err))
