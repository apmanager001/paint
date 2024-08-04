const express = require('express');
// const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const {mongoose} = require('mongoose')


const app = express();

//Database Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch(() => console.log("Database not conected"));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.disable("x-powered-by");


// API Routes
app.use('/', require('./routes/routes'))

const port = process.env.PORT;

app.listen(port, () =>{
    console.log(`Server Connected to Port ${port}`);
})