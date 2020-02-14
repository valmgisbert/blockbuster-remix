const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameForRentSchema = new Schema(
  {
    gameAPIRef: { type: Number, required: false },
    rentRequestRef: { type: Number, required: false },
    title : { type: String, required: false},
    price: { type: Number, required: false },
    minDays: { type: Number, required: false },
    maxDays: { type: Number, required: false },
    isAvailable: { type: Boolean, required: false }
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
