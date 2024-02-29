const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide your Username"]
  },
  canvasId: {
    type: String
  }
});

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel