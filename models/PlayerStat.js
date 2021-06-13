const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const schema = Schema({
  playerId: {
    type: ObjectId,
    required: true,
    ref: 'Player',
  },
  killId: {
    type: ObjectId,
    required: true,
    ref: 'Kill',
  },
  playerName: String,
  personalDps: Number,
  profession: String,
}, { timestamps: true });

module.exports = mongoose.model('playerstat', schema);
