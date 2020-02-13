const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentRequestSchema = new Schema(
  {
    gameOwnerRef: { type: Number, required: true },
    gameForRentRef: { type: Number, required: true },
    gameRenterRef: { type: Number, required: true }
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
