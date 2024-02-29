const express = require("express");
const router = express.Router();

const cors = require("cors");

const url = process.env.SERVER_URL;

//middleware
router.use(
  cors({
    credentials: true,
    origin: url,
  })
);