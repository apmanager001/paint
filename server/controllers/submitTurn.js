const ActiveUser = require("../models/activeUser.js");

const submitTurn = async (req,res) => {
    try {
      const { username, canvasId } = req.body;

      let newCanvasId = canvasId;
      if (!canvasId) {
        const date = new Date();
        const newCanvas = await canvas.create({
          dateStarted: date,
        });
        newCanvasId = newCanvas._id;
      }

      const user = await ActiveUser.create({
        username, canvasId: newCanvasId
      });
       if (!user) {
         return res.status(404).json({ result: 0 });
       }
       
      return res.json(user);
    } catch (error) {
      console.log(error);
    }
}

const checkActiveUser =  async (req,res) => {
    try{
      const user = await ActiveUser.find({})
  
      res.json(user)
    } catch{
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    submitTurn,
    checkActiveUser
}
