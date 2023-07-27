const mongoose = require("mongoose");
const Candidate = require("./candidate");

const userschema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone_no: { type: Number, required: true },
    user_type: { type: String, required: true },
    isvoted: { type: Boolean, required: true },
    candidate: { type: mongoose.SchemaTypes.ObjectId, ref: "Candidate" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userschema);
