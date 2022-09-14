global.__basedir = __dirname;
require("dotenv").config({ path: "configs/.env" });

const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");

// Security pkgs
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");

// import routes, db config, error handling
const hashcode = require("./routes/hashcode.routes");
const admin = require("./routes/admin.routes");
const connectDB = require("./configs/db");
const errorHandler = require("./middleware/error");
const PORT = process.env.PORT || 7000;

const app = express();

// body parsing
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Remove data using these defaults:
app.use(mongoSanitize());
// Security headers
app.use(helmet());
// Prevent XSS
app.use(xss());
// Limit req rate
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 100, // Each ip maximum 100 requests per 15 minutes
});
app.use(limiter);
// Protect against HTTP Parameter Pollution attacks
app.use(hpp());
// Enable CORS
app.use(cors());

app.use(express.static(path.join(__dirname, "./client/build")));

// Mount routers
app.use("/user", hashcode);
app.use("/admin", admin);
// error handling
app.use(errorHandler);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on ${PORT} port...`);
  connectDB();
});

// turn off server if error occurs
process.on("unhandledRejection", (err, promise) => {
  console.log(`Err: ${err.message}`);
  server.close(() => process.exit(1));
});
