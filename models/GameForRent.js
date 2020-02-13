const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameForRentSchema = new Schema(
  {
    gameAPIRef: { type: Number, required: true },
    rentRequestRef: { type: Number, required: true },
    price: { type: Number, required: true },
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
