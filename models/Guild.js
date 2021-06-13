const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = Schema({
  fullName: String,
  tag: String,
  url: String,
}, { timestamps: true });

module.exports = mongoose.model('guild', schema);
