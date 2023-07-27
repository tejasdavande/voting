const express = require("express");
const router = express.Router();
const auth = require("../middleware/validateTokenhandler");

//controllers//
const {
  createuser,
  loginuser,
  checkVotingStatus,
} = require("../controller/user");

// routes
router.post("/signup", createuser);
router.post("/login", loginuser);
router.get("/checkVotingStatus", auth, checkVotingStatus);

module.exports = router;
