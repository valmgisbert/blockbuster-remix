const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentRequestSchema = new Schema(
  {
    gameOwnerRef: { type: Number, required: false },
    gameForRentRef: { type: Number, required: false },
    gameRenterRef: { type: Number, required: false }
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
