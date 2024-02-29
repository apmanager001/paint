const mongoose = require("mongoose");
const { Schema } = mongoose;

const activeCanvas = new Schema({
    moveNumber: {
        type: Number,
    },
    username: {
        type: String,
    },
    cellClass: {
        type: String
    },
    dateStarted: {
        type: Date
    },
    dateEnded: {
        type: Date
    }
});

const ActiveCanvas = mongoose.model("ActiveCanvas", activeCanvas);

module.exports = ActiveCanvas;
