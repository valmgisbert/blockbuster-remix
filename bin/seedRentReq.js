const mongoose = require("mongoose");
const RentRequest = require("../models/RentRequest");

const rentRequests = [
  {
    gameForRentRef: "5e497c513f88f37145c03a18",
    gameOwnerRef: "5e497c313f88f37145c03a17",
    gameRenterRef: "5e497e5efd27067214be5763"
  },
  {
    gameForRentRef: "5e498234170156723d0c6615",
    gameOwnerRef: "5e497c313f88f37145c03a17",
    gameRenterRef: "5e497e5efd27067214be5763"
  },
  {
    gameForRentRef: "5e497e7bfd27067214be5764",
    gameOwnerRef: "5e497e5efd27067214be5763",
    gameRenterRef: "5e497c313f88f37145c03a17"
  }
];

// SEED SEQUENCE

const dbName = "Blockbuster-Remix-DB";

// 1. ESTABLISH CONNECTION
mongoose
  .connect(`mongodb://localhost/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    // 2. CREATE DOCUMENTS FROM THE ARRAY OF GAMESFORRENT
    const pr = RentRequest.create(rentRequests);
    return pr;
  })
  .then(createdRequest => {
    console.log(`Created ${createdRequest.length} game requests`);

    // 3. CLOSE THE DB CONNECTION
    const pr = mongoose.connection.close();
    return pr;
  })
  .then(() => console.log("Connection closed!"))
  .catch(err => console.error("Error connecting to mongo", err));
