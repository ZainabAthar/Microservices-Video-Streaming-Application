const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Usage } = require("./models/UsageSchema");
const mongoose = require("./config/db");
const axios = require("axios");
require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());
const cron = require("node-cron");


app.post("/events", async (req, res) => {
  console.log("Event Received:", req.body.type);
  const { type, data } = req.body;
  if (type === "UserCreated") {
    try {
      const { userId } = data;
      const usage = await Usage.findOne({ userId });
      if (!usage) {
        const initialUsage = new Usage({
          userId,
          bandwidthTotalUsage: 0,
          bandwidthDailyUsage: 0,
          dailyLimit:100000
        });
        await initialUsage.save();
        console.log("Usage Added")
      }
    } catch (error) {
      console.error("Error handling UserCreated event:", error.message);
    }
  }
  if (type === "videosAdded") {
    try {
      const { userId, videosEv } = data;
      const usage = await Usage.findOne({ userId });

      if (!usage) {
        console.error("Usage not found for User:", userId);
        return res.status(404).send("Usage not found");
      }

      const totalAddedSize = videosEv.reduce(
        (total, video) => total + video.size,
        0
      );

      usage.bandwidthTotalUsage += totalAddedSize;
      usage.bandwidthDailyUsage += totalAddedSize;

      await usage.save();
      console.log("Usage updated for videosAdded event:", userId);

      try {
        await axios.post(`${process.env.EVENT_SERV}/events`, {
          type: "UsageUpdated",
          data: {
            userId,
            usageDetails: {
              bandwidthTotalUsage: usage.bandwidthTotalUsage,
              bandwidthDailyUsage: usage.bandwidthDailyUsage,
            },
          },
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Error handling videosAdded event:", error.message);
      return res.status(500).send("Internal Server Error");
    }
  }
  res.send({});
});

// Schedule a cron job to run every day at 12 AM and reset bandwidth
cron.schedule("0 0 * * *", async () => {
  try {
    // Reset bandwidth for all users to 25MB
    const users = await Usage.find({});

    for (const user of users) {
      user.bandwidthDailyUsage = 0;
      await user.save();
      console.log(`Bandwidth reset for user ${user.userId}`);
    }

    console.log("Bandwidth reset for all users");
  } catch (error) {
    console.error("Error resetting bandwidth:", error.message);
  }
}
, {
  timezone: "Asia/Karachi", // Set the desired time zone here
}
);


const port = process.env.PORT || 4004;

app.listen(port,()=>console.log(`Usage service Server up and running on port ${port}`));