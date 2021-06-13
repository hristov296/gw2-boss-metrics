const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = Schema({
  logName: String,
  killDateTime: Date,
  boss: String,
  duration: Number,
  eiVer: String,
  squadDps: Number,
  fightId: Number,
  patch: Number,
  guildId: {
    type: ObjectId,
    required: true,
    ref: 'Guild',
  },
}, { timestamps: true });

module.exports = mongoose.model('kill', schema);
