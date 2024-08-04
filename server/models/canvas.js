const mongoose = require("mongoose");
const { Schema } = mongoose;

const canvas = new Schema({
  dateStarted: {
    type: Date,
    required: true,
  },
  dateEnded: {
    type: Date,
  },
});


const Canvas = mongoose.model("Canvas", canvas);

module.exports = Canvas;
