const mongoose = require("mongoose");
const { Schema } = mongoose;

const activeUser = new Schema({
  canvasId: {
    type: String,
  },
  username: {
    type: String,
  },
});

const ActiveUser = mongoose.model("ActiveUser", activeUser);

module.exports = ActiveUser;
