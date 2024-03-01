const ActiveUser = require("../models/activeUser.js");

const postAddUser = async (req, res) => {
    try {
      const { username, canvasId } = req.body;

      if (!username || !canvasId) {
        return res
          .status(400)
          .json({ error: "Username and canvasId are required." });
      }

      const user = await ActiveUser.create({
        username,
        canvasId,
      });
      return res.json(user);
    } catch (error) {
      console.error("Error adding user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    

}

module.exports = {
    postAddUser
}