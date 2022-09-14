const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const Team = require("../models/Team");

exports.protect = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorResponse("Unauthorized", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.team = await Team.findById(decoded.id);
  next();
});

exports.authorization = async (req, res, next) => {
  const { token } = req.cookies;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const team = await Team.findById(decoded.id);
  if (team.email != process.env.ADMIN_MAIL|| team.role != "admin") {
    return next(
      new ErrorResponse(`Access to this route is forbidden for teams`, 403)
    );
  }
  next();
};
