const UserModel = require('../models/users.js')
const Canvas = require('../models/canvas.js')


const getCurrentUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await UserModel.find({ canvasId: id});

    res.json(users);
  } catch (error) {
    console.error("Error getting users by canvasId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCanvas = async (req, res) => {
  try {
    // Find all canvas documents
    const allCanvas = await Canvas.find({});

    // If no canvas exists, create a new one
    let canvasId;
    if (allCanvas.length === 0) {
      const date = new Date();
      const newCanvas = await Canvas.create({
        dateStarted: date,
      });
      canvasId = newCanvas._id;
      console.log("Created new canvas with ID:", canvasId);
    } else {
      // Get the last canvas's ID
      const lastCanvas = allCanvas[allCanvas.length - 1];
      canvasId = lastCanvas._id;
    }

    // Return the canvas ID
    res.json({ canvasId });
  } catch (error) {
    console.error("Error getting the last canvas:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
    // getUsers,
    getCurrentUsers,
    getCanvas
}