const mongoose = require("mongoose");
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`DB connected! -> ${conn.connection.host}`.bgMagenta.black);
};

module.exports = connectDB