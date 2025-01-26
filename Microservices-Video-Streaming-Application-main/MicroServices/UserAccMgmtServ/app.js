const express = require("express")
const app=express()
const cors=require("cors")
const mongoose=require("./config/db")
const bodyParser = require('body-parser');
const {User}=require("./models/UserSchema")

require('dotenv').config();
app.use(bodyParser.json());
app.use(cors())


const users = require("./routes/api/users");

app.use("/users",users);
app.post("/events", async (req, res) => {
  console.log("Event Received:", req.body.type);

  res.send({});
});


const port = process.env.PORT || 4000;

app.listen(port,()=>console.log(`Account service Server up and running on port ${port}`));