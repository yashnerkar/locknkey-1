const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV == "development") {
    console.log(err);
  }
  const error = { ...err };

  error.message = err.message;
  error.name = err.name;

  // Duplicate field error
  if (error.code == 11000) {
    const duplicate = Object.keys(error.keyPattern) + ""
    error.message = `Duplicate ${duplicate} value`;
    error.status = 400;
    new ErrorResponse(error.message, error.status);
  }

  // MongoError
  if (error.name == "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.properties.message);
    console.log(err.errors)
    error.message = errors;
    error.status = 400;
    new ErrorResponse(error.message, error.status);
  }

  res
    .status(error.status || 500)
    .json({ success: false, error: error.message || "Internal Server Error" });
};

module.exports = errorHandler;
