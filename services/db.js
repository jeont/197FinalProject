require('dotenv').config();
const mongoose = require('mongoose');
const db = process.env.MONGOURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);

    // Exit the process with a failing code
    process.exit(1);
  }
};

module.exports = connectDB;
