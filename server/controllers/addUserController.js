const ActiveUser = require("../models/activeUser.js");

const addUser = async (req, res) => {
    try {
        const { username } = req.body

        const user = await User.create({
            username
        })
        return res.json(user)
    } catch(error){
        console.log(error);
    }
    

}

module.exports = {
    addUser
}