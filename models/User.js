const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema( 
    {
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    fullName: { type: String, required: true, maxlength: 20 },
    birthday: { type: Date },
    gender: { type: String, enum: ["F", "M", "Other"] },
    address: { type: String, required: true, maxlength: 30 },
    phone: { type: String, required: true, minlength: 9, maxlength: 9 },
    cardInfo: {
        typeOfCard: { type: String, required: true, enum: ["Visa", "MasterCard", "American Express", "Other"]  },
        cardNumber: { type: Number, required: true  },
        expDate: { type: Date, required: true },
        cvv: { type: Number, required: true },
    }
},
{
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
}
);

const User = mongoose.model("User", userSchema);

module.exports = User;