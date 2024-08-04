const UserModel = require("../models/users.js");
const ActiveUser = require('../models/activeUser.js')

const postAddUser = async (req, res) => {
    try {
      const { squares, canvasId, users } = req.body;
        
      const userAlt = users ? users : "helloworld";

      await UserModel.create({
            username: userAlt, canvasId: canvasId, moves: squares,
          });
      
       
       return res.status(200)
    } catch (error) {
      console.error("Error adding user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
}


const deleteActive = async (req, res) => {
  try {
    const { canvasId, users } = req.body;

    if (!canvasId || !users) {
      return res
        .status(400)
        .json({ error: "Canvas ID and username are required" });
    }
    const result = await ActiveUser.deleteOne({
      username: users,
      canvasId: canvasId,
    });
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ error: "No matching document found to delete" });
    }
    return res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error deleting document:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


module.exports = {
    postAddUser,
    deleteActive
}