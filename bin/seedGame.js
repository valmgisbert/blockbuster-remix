const mongoose = require("mongoose");
const GameForRent = require("../models/GameForRent");

const gamesForRent = [
    {
        gameAPIRef: "1",
        rentRequestRef: "4857397489537",
        title: "GRIS",
        price: "10",
        minDays: "2",
        maxDays: "7",
        isAvailable: true,
    },
    {
        gameAPIRef: "2",
        rentRequestRef: "6407506748095",
        title: "Oxenfree",
        price: "9",
        minDays: "2",
        maxDays: "7",
        isAvailable: true,
    },
    {
        gameAPIRef: "3",
        rentRequestRef: "48536749576839",
        title: "Stardew Valley",
        price: "8",
        minDays: "2",
        maxDays: "7",
        isAvailable: true,
    },
];

// SEED SEQUENCE

const dbName = "Blockbuster-Remix-DB"

// 1. ESTABLISH CONNECTION
mongoose
  .connect(`mongodb://localhost/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then (() => {
      // 2. CREATE DOCUMENTS FROM THE ARRAY OF GAMESFORRENT
      const pr = GameForRent.create(gamesForRent);
      return pr;
  })
  .then(createdGame => {
      console.log(`Created ${createdGame.length} game files`);

  // 3. CLOSE THE DB CONNECTION
    const pr = mongoose.connection.close();
    return pr;
})
.then(() => console.log("Connection closed!"))
.catch(err => console.error("Error connecting to mongo", err))
