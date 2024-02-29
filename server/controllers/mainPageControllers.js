const UserModel = require('../models/users.js')
const ActiveCanvas = require('../models/activeCanvas.js')
const ActiveUser = require('../models/activeUser.js')

const getUsers = async (req,res) =>{
    try {
       const user = await User.find({});
    res.json(user) 
    } catch {
         console.error("Error fetching all auctions:", error);
         res.status(500).json({ error: "Internal Server Error" });
    }
    
}



module.exports = {
    getUsers,
}