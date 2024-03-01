const ActiveUser = require("../models/activeUser.js");
const UserSchema = require('../models/users.js')

const submitTurn = async (req,res) => {
    try {
      const { username, canvasId } = req.body;

      const user = await UserSchema.create({
        username,
      });
      return res.json(user);
    } catch (error) {
      console.log(error);
    }
}


module.exports = {
    submitTurn
}
