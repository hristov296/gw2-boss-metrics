const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = Schema({
  accountName: String,
}, { timestamps: true });

module.exports = mongoose.model('player', schema);
