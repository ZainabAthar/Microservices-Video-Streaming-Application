const express = require("express")
const app=express()
const cors=require("cors")
const bodyParser = require('body-parser');
const mongoose = require("./config/db");
require('dotenv').config();
app.use(bodyParser.json());
app.use(cors())
const { Log } = require("./models/LogSchema");



app.post("/events", async (req, res) => {
  console.log("Event Received:", req.body.type);
  const { type, data } = req.body;
  if (type === "UserCreated") {
    try {
      const { userId, username } = data;
      const log = new Log({
        userId,
        logs: [{
          message: `User ${username} created`,
        }],
      });
      await log.save();
    } catch (error) {
      console.error("Error creating log for user creation:", error);
    }
  }

  if (type === "UserLoggedIn") {
    try {
      const { userId, username } = data; 
      const log = await Log.findOne({ userId });

      if (log) {
        log.logs.push({
          message: `User ${username} logged in`,
        });
        await log.save();
      }
    } catch (error) {
      console.error("Error creating log for user login:", error);
    }
  }
  if (type === "videosAdded") {
    try {
      const { userId, videosEv } = data;
      const log = await Log.findOne({ userId });
     
      if (log) {
        const logMessage = `videos added by user ${userId}: ${videosEv.map(video => video.title).join(", ")}`;
        log.logs.push({ message: logMessage });
        await log.save();
      }
    } catch (error) {
      console.error("Error creating log for video removed:", error);
    }
      
          
  }
  if (type === "videoRemoved") {
    try {
      const { userId,videoId } = data; 
      const log = await Log.findOne({ userId });

      if (log) {
        log.logs.push({
          message: `video with the id ${videoId} removed from DB`,
        });
        await log.save();
      }
    } catch (error) {
      console.error("Error creating log for video removed:", error);
    }
  }

  res.send({});
});


const port = process.env.PORT || 4003;

app.listen(port,()=>console.log(`Log service Server up and running on port ${port}`));