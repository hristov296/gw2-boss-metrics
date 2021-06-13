const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = Schema({
  googleId: String,
  email: String,
  username: String,
  password: String
}, { timestamps: true });

module.exports = mongoose.model('user', schema);
