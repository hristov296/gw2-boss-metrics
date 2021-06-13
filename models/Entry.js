const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = Schema({
  uuid: String,
  name: String,
  gSheetId: String,
  dpsLink: String,
  logDate: Date,
  boss: String,
  duration: String,
  eiVer: String,
  fightId: Number,
  cellAddress: String,
  isVisible: Boolean,
}, { timestamps: true });

module.exports = mongoose.model('entry', schema);
