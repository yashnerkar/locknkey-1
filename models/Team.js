const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const TeamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      unique: [true, "Team name already exists"],
      required: [true, "Please enter name"],
      match: [/^(?!\s*$).+/, "Invalid name"],
      maxLength: [30, "Please provide team name less than 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: [true, "Email already registered"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      select: false,
      match: [/^(?!\s*$).+/, "Invalid password"],
      maxLength: [30, "Please provide password less than 30 characters"],
    },
    role: {
      type: String,
      enum: ["admin", "team"],
      default: "team",
    },
    assignedColorCode: {
      type: String,
      enum: ["00FFFF", "A52A2A", "ADFF2F", "FF0000", "FF00FF", "FF0700"],
    },
    result: {
      attempted: {
        type: Boolean,
        default: false,
      },
      startTime: {
        type: Number,
        default: 0,
      },
      endTime: {
        type: Number,
        default: 0,
      },
      win: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

TeamSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.assignedColorCode = [
      "00FFFF",
      "A52A2A",
      "ADFF2F",
      "FF0000",
      "FF00FF",
      "FF0700",
    ][Math.floor(Math.random() * 5)];
    this.password = await bcrypt.hash(this.password, 10);
    if (this.assignedColorCode) {
      next();
    }
  }
  next();
});

TeamSchema.methods.getSignToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

TeamSchema.methods.matchPassword = async function (passwordEntered) {
  console.log(passwordEntered, this.password)
  return await bcrypt.compare(passwordEntered, this.password);
};

module.exports = mongoose.model("Team", TeamSchema);
