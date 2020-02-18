const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameForRentSchema = new Schema(
  {
    // gameAPIRef: { type: String, required: true }, // REMOVED AS GAMES CAN BE FOUND IN API BY TITLE AND PLATFORM
    // rentRequestRef: { type: String, required: false }, // REMOVED AS THIS WILL BE REFERENCED IN THE RENT REQUEST
    gameOwnerRef: { type: mongoose.ObjectId, ref: "User", required: true },
    title: { type: String, required: true }, // exact format from api
    platform: { type: String, required: true }, // exact format from api
    image: { type: String, required: true }, 
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

const GameForRent = mongoose.model("GameForRent", gameForRentSchema);

module.exports = GameForRent;
