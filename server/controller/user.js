const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../common/asyncHandler");
require("dotenv").config();

// POST /user/signup — register a new voter
const createuser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const existing = await User.findOne({ username });
  if (existing) {
    res.status(400);
    throw new Error("User is already registered");
  }

  const hashpassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    phone_no: req.body.phone_no,
    password: hashpassword,
    user_type: "voter",
    isvoted: false,
  });

  res.status(201).json({ message: "User was created", userId: user._id });
});

// POST /user/login — authenticate and return a JWT
const loginuser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("Please provide username and password");
  }

  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accesstoken = jwt.sign(
      {
        user: {
          email: user.email,
          username: user.username,
          user_type: user.user_type,
          isvoted: user.isvoted,
        },
      },
      process.env.PRIVATEKEY,
      { expiresIn: "7d" }
    );
    return res
      .status(200)
      .json({ accesstoken, userType: user.user_type });
  }

  res.status(401);
  throw new Error("Please provide correct username and password");
});

// GET /user/checkVotingStatus — has the current user voted, and for whom
const checkVotingStatus = asyncHandler(async (req, res) => {
  const user = await User.findOne(
    { username: req.myValue.username },
    { isvoted: 1, candidate: 1 }
  ).populate("candidate");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user.isvoted) {
    return res.status(200).json({ isvoted: true, candidate: user.candidate });
  }
  res.status(200).json({ isvoted: false });
});

module.exports = {
  createuser,
  loginuser,
  checkVotingStatus,
};
