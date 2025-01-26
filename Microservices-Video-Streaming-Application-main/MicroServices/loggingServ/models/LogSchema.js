const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  userId: {
    type:String,
    required: true,
  },
  logs: [{
    message: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
});

const Log = mongoose.model('Log', logSchema);

module.exports = { Log };
