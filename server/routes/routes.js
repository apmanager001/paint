const express = require("express");
const router = express.Router();
const {getUsers, getCurrentUsers} = require('../controllers/mainPageControllers')
const {postAddUser} = require('../controllers/addUserController')
const { submitTurn } = require('../controllers/submitTurn')
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
router.get('/currentUsers', getCurrentUsers)

//adding user to activeuser table
router.post('/startTurn', postAddUser)

//submitting a turn
router.post('/submitTurn', submitTurn)



module.exports = router;