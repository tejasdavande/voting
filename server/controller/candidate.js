const Candidate = require("../models/candidate");
const User = require("../models/user");
const asyncHandler = require("../common/asyncHandler");

// POST /candidate/createcandidate — admin adds a candidate
const createcandidate = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("Candidate name is mandatory");
  }

  const count = await Candidate.countDocuments();
  const candidate = await Candidate.create({
    candidate_id: count + 1,
    name,
    count: 0,
  });

  res
    .status(201)
    .json({ message: "Candidate was created successfully", candidate });
});

// GET /candidate/listofcandidate — list candidates (authenticated voters)
const getcandidate = asyncHandler(async (req, res) => {
  const candidatedetails = await Candidate.find({});
  res
    .status(200)
    .json({ count: candidatedetails.length, candidatedetails });
});

// POST /candidate/updatecandidatevotes — cast a vote (one per user)
const updatecandidatevotes = asyncHandler(async (req, res) => {
  const voter = await User.findOne(
    { username: req.myValue.username },
    { isvoted: 1 }
  );

  if (!voter) {
    res.status(404);
    throw new Error("User not found");
  }
  if (voter.isvoted) {
    res.status(403);
    throw new Error("You have already voted");
  }

  const { id } = req.body;
  const candidate = await Candidate.findById(id);
  if (!candidate) {
    res.status(404);
    throw new Error("Candidate is not available in database");
  }

  await Candidate.updateOne({ _id: id }, { $inc: { count: 1 } });
  await User.updateOne(
    { username: req.myValue.username },
    { $set: { isvoted: true, candidate: id } }
  );

  res.status(200).json({ message: "Vote updated successfully" });
});

// GET /candidate/getcandidatevotes — admin views tallies
const getcandidatevotes = asyncHandler(async (req, res) => {
  const candidatevotes = await Candidate.find({}, { name: 1, count: 1 });
  res.status(200).json({ candidatevotes });
});

module.exports = {
  createcandidate,
  getcandidate,
  updatecandidatevotes,
  getcandidatevotes,
};
