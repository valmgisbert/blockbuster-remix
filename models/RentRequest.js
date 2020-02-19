const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentRequestSchema = new Schema(
  {
    gameForRentRef: {type: mongoose.ObjectId, ref: "GameForRent", required: true},
    gameOwnerRef: {type: mongoose.ObjectId, ref: "User", required: true},
    gameRenterRef: {type: mongoose.ObjectId, ref: "User", required: true},
    totalDays: {type: Number, required: true},
    totalPrice: {type: Number, required: true}
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const RentRequest = mongoose.model("RentRequest", rentRequestSchema);

module.exports = RentRequest;
