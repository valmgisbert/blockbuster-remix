const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentRequestSchema = new Schema(
  {
    gameForRentRef: { type: mongoose.ObjectId, required: true },
    gameOwnerRef: { type: mongoose.ObjectId, required: true },
    gameRenterRef: { type: mongoose.ObjectId, required: true }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const RentRequest = mongoose.model("Rent Request", rentRequestSchema);

module.exports = RentRequest;
