const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
require("dotenv").config();

//signup the new user
const createuser = async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("All field are mandatory");
    } else {
      const checkuser = await User.findOne({ username: username });
      if (checkuser) {
        res.status(400);
        throw new Error("User is already registed");
      } else {
        const hashpassword = await bcrypt.hash(password, 10);
        console.log("my hashed password is", hashpassword);

        const newuser = await User.create({
          username,
          email,
          phone_no: req.body.phone_no,
          password: hashpassword,
          user_type: "voter",
          isvoted: false,
        });
        console.log(newuser);
      }
    }
    res.status(200).json({ message: "user was created" });
  } catch (error) {
    throw error.message;
  }
};

//login the existing user with token generation
const loginuser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400);
      throw new Error("Please provide username and password");
    } else {
      const checkuser = await User.findOne({ username: username });
      if (checkuser && (await bcrypt.compare(password, checkuser.password))) {
        const accesstoken = jwt.sign(
          {
            user: {
              email: checkuser.email,
              username: checkuser.username,
              user_type: checkuser.user_type,
              isvoted: checkuser.isvoted,
            },
          },
          process.env.PRIVATEKEY,
          { expiresIn: "7d" }
        );
        res.status(200).json({ accesstoken, userType: checkuser.user_type });
      } else {
        res.status(401);
        throw new Error("Please provide correct username and password");
      }
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const checkVotingStatus = async (req, res, next) => {
  try {
    const { isvoted } = await User.findOne(
      { username: req.myValue.username },
      { isvoted: 1 }
    );
    if (isvoted) {
      const { candidate } = await User.findOne(
        { username: req.myValue.username, isvoted: true },
        { candidate: 1 }
      ).populate("candidate");
      res.status(200).json({ isvoted, candidate });
    } else {
      res.status(200).json({ isvoted });
    }
  } catch (error) {
    
    throw error.message;
  }
};

module.exports = {
  createuser,
  loginuser,
  checkVotingStatus,
};
