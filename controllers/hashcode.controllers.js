const path = require("path");
const fs = require("fs");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Team = require("../models/Team");

// helper function
const sendToken = async (team, statusCode, res) => {
  // console.log(team)
  const token = await team.getSignToken();
  const secure = process.env.NODE_ENV == "production" ? true : false;
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .cookie("_id", team._id, options)
    .json({ success: true });
};

// @desc    Register team
// @route   POST /register
exports.register = asyncHandler(async (req, res, next) => {
  const { teamName, email, password } = req.body;
  const team = await Team.create({
    teamName,
    email,
    password,
  });
  sendToken(team, 200, res);
});

// @desc    Login team
// @route   POST /login
exports.login = asyncHandler(async (req, res, next) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please enter email and password", 400));
  }

  let team = await Team.findOne({ email }).select("+password");

  if (!team || !(await team.matchPassword(password))) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  if (team.result.attempted) {
    return next(new ErrorResponse("You've already attempted the test!", 400));
  }

  if (team.result.startTime == 0 && team.result.attempted == false) {
    team = await Team.updateOne(
      { email },
      {
        result: {
          attempted: false,
          startTime: Date.now(),
          endTime: 0,
          win: false,
        },
      }
    );
  }

  sendToken(team, 200, res);
});

// @desc    Get questions
// @route   GET /question
exports.question = asyncHandler(async (req, res, next) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(__basedir, "data", "image.json"))
  );
  const questions = data[`${req.team.assignedColorCode}`];
  return res.status(200).json({ success: true, questions });
});

// @desc    Check user results
// @route   POST /check
exports.postCheck = asyncHandler(async (req, res, next) => {
  const { teamSolution } = req.body;
  const { _id } = req.cookies;
  const team = await Team.findById(_id);
  if (team.result.attempted) {
    return next(new ErrorResponse("Already attempted", 400));
  }
  const win = teamSolution == team.assignedColorCode;
  team.result.attempted = true;
  team.result.win = win;
  team.result.endTime = Date.now();
  await team.save();

  return res.status(200).json({ success: true });
});
