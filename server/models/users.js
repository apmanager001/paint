const mongoose = require("mongoose");

const { Schema } = mongoose;
const Canvas = require("./canvas.js");

const userSchema = new Schema({
  username: {
    type: String,
    // required: [true, "Please provide your Username"]
  },
  moves: [
    {
      squareId: {
        type: String, // Assuming squareId is a number
        required: true,
      },
      color: {
        type: String, // Assuming colorIndex is a number
        required: true,
      },
    },
  ],

  canvasId: {
    type: Schema.Types.ObjectId,
    ref: "Canvas",
  },
});

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel