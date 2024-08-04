const express = require("express");
const router = express.Router();
const {
  getCanvas,
  getCurrentUsers,
} = require("../controllers/mainPageControllers");
const {postAddUser, deleteActive} = require('../controllers/addUserController')
const { submitTurn, checkActiveUser } = require('../controllers/submitTurn')
const cors = require("cors");

const url = process.env.SERVER_URL;

//middleware
router.use(
  cors({
    credentials: true,
    origin: url,
  })
);


//adding user to activeuser table
router.post('/startTurn', submitTurn)
router.get('/checkActiveUser', checkActiveUser)

//submitting a turn
router.post('/submitTurn', postAddUser)
router.delete('/deleteActive', deleteActive);

//Getting the last canvas id
router.get('/getCanvas', getCanvas)
router.get('/currentUsers/:id', getCurrentUsers)
router.get('/checkNeedNewGrid')

module.exports = router;