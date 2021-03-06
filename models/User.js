const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const validatePassword = async (inputPassword) => {
  const hash = bcrypt.compare(inputPassword, this.password);
  return this.password === hash;
};

UserSchema.methods.validatePassword = validatePassword;

module.exports = User = mongoose.model('User', UserSchema);
