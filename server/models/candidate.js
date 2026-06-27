const mongoose = require("mongoose");

const candidateschema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    count: { type: Number, required: true, default: 0, min: 0 },
    candidate_id: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidate", candidateschema);
