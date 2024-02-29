const express = require("express");
const router = express.Router();
const {getUsers} = require('../controllers/mainPageControllers')
const {addUser} = require('./controllers/addUserController')
const cors = require("cors");

const url = process.env.SERVER_URL;

//middleware
router.use(
  cors({
    credentials: true,
    origin: url,
  })
);


//initial main page load endpoints
router.get('/activeUser', getUsers)
router.get('/currentUsers', )

//adding user to activeuser table
router.post('/addUser', addUser)









module.exports = router;