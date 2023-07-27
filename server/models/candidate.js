const mongoose = require("mongoose");

const candidateschema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    count: { type: Number, require: true },
    candidate_id: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Candidate", candidateschema);
