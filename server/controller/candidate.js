const mongoose = require("mongoose");
const Candidate = require("../models/candidate");
const { ObjectId } = require("mongoose");
const User = require("../models/user");
const user = require("../models/user");
const candidate = require("../models/candidate");

//To add new Candidate in database by admin access//

const createcandidate = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name } = req.body;
    if (!name) {
      console.log(
        "please provide name of candidate to move further for creation"
      );
      res.status(400);
      throw new Error("All Fields are mandatory !");
    } else {
      const presentcandidate = await Candidate.find({}, { candidate_id: 1 });
      const memberidis = presentcandidate.length + 1;
      const candidate = await Candidate.create({
        candidate_id: memberidis || 0,
        name,
        count: 0,
      });
      console.log(candidate);
      res
        .status(201)
        .json({ message: "Candidate was created succefully", candidate });
    }
  } catch (error) {
    throw error;
  }
};

//To fetch details of Registered Candidates //
const getcandidate = async (req, res, next) => {
  try {
    const id = req.params.body;
    const candidatedetails = await Candidate.find({}); //candidate_id: id //
    res.status(200).json({ candidatedetails });
  } catch (error) {
    throw error;
  }
};

// To store vote of candidate//
const updatecandidatevotes = async (req, res, next) => {
  try {
    const userstatus = await User.findOne(
      { username: req.myValue.username },
      { isvoted: 1 }
    );

    if (userstatus.isvoted) {
      res.status(403).send("You are already Vote");
    } else {
      const id = req.body.id;
      const candidate_id = await Candidate.findOne({ _id: id });
      if (candidate_id) {
        let count = candidate_id.count + 1;
        const detailsupdate = await Candidate.findOneAndUpdate(
          { _id: id },
          { $set: { count: count } }
        );

        const updateuser = await User.updateOne(
          {
            username: req.myValue.username,
          },
          { $set: { isvoted: true, candidate: req.body.id } }
        );

        res.status(201).json({ message: "Vote updated Successfully" });
      } else {
        res
          .status(404)
          .json({ message: "Canidate is not available in Database" });
      }
    }
  } catch (error) {
    throw error;
  }
};

// To get data of votes recieved by candidate by admin access//
const getcandidatevotes = async (req, res, next) => {
  try {
    const id = req.params.body;
    const candidatevotes = await Candidate.find({}, { name: 1, count: 1 }); //candidate_id: id //
    res.status(200).json({ candidatevotes });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createcandidate,
  getcandidate,
  updatecandidatevotes,
  getcandidatevotes,
};
