const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameForRentSchema = new Schema(
  {
    gameAPIRef: { type: String, required: true }, // url to get info from api. we can also use title and platform. NEEDED?
    rentRequestRef: { type: String, required: false }, //COULD BE AN ARRAY OF REQUESTS. NEEDED?
    gameOwnerRef: { type: String, required: true }, 
    title: { type: String, required: true }, // from api
    platform: { type: String, required: true }, // from api
    price: { type: Number, required: true },
    minDays: { type: Number, required: false },
    maxDays: { type: Number, required: true },
    isAvailable: { type: Boolean, required: true }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const GameForRent = mongoose.model("Game For Rent", gameForRentSchema);

module.exports = GameForRent;
