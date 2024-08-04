const mongoose = require("mongoose");
const { Schema } = mongoose;
const Canvas = require("./canvas.js");

const activeUser = new Schema({
  canvasId: {
    type: Schema.Types.ObjectId,
    ref: "Canvas",
  },
  username: {
    type: String,
  },
});

const ActiveUser = mongoose.model("ActiveUser", activeUser);

module.exports = ActiveUser;
