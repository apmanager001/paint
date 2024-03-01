const UserModel = require('../models/users.js')
const ActiveCanvas = require('../models/activeCanvas.js')
const ActiveUser = require('../models/activeUser.js')
const Users = require('../models/users.js')

const getUsers = async (req,res) => {
    try {
       const user = await ActiveUser.find({});
        if (user.length === 0) {
          return res.json([]);
        }
        console.log(user);
        res.json(user);
    } catch {
         console.error("Error finding one user:", error);
         res.status(500).json({ error: "Internal Server Error" });
    }
    
}

const getCurrentUsers = async (req,res) => {
    try {
      const user = await UserModel.find({});
      if (user.length === 0) {
        return res.json([]);
      }
      console.log(user)
      res.json(user);
    } catch {
      console.error("Error get all users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports = {
    getUsers,
    getCurrentUsers
}