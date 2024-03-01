const mongoose = require("mongoose");
const { Schema } = mongoose;

const previousCanvas = new Schema({
  canvasNumber: {
    type: Number,
  },
  moves: {
    type: Object
  },
  users: {
    type: Array,
  },
  dateStarted: {
    type: Date,
  },
  dateEnded: {
    type: Date,
  },
});

const PreviousCanvas = mongoose.model("PreviousCanvas", previousCanvas);

module.exports = PreviousCanvas;
