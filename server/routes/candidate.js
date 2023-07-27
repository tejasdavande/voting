const express = require("express");
const router = express.Router();
const auth = require("../middleware/validateTokenhandler");
const adminauth = require("../middleware/checkForAdmin");
const authcandidate = require("../middleware/validateTokenhandlercandidate");

//controllers//
const {
  getcandidate,
  createcandidate,
  getcandidatevotes,
  updatecandidatevotes,
} = require("../controller/candidate");

//routes//
router.get("/listofcandidate",authcandidate, getcandidate);
router.post("/createcandidate", adminauth, createcandidate);
router.get("/getcandidatevotes", adminauth, getcandidatevotes);
router.post("/updatecandidatevotes", auth, updatecandidatevotes);

module.exports = router;
