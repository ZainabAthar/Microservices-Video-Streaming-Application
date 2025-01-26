const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { Query } = require("./models/QuerySchema");
const mongoose = require("./config/db");
const cron = require("node-cron");
require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());


const queries = require("./routes/queries");

app.use("/queries", queries);

app.post("/events", async (req, res) => {
  console.log("Event Received:", req.body.type);
  const { type, data } = req.body;
  if (type === "UserCreated") {
    try {

      const { userId, username, email } = data;
      const query = await Query.findOne({ userId });
      if (!query) {
        console.log(`user id in query${userId}`)
        const defaultQueryData = {
          userId: userId,
          username: username,
          email: email,
          gallery: {
            videos: [],
          },
          storage: {
            totalStorage: 50000,
            UsedStorage: 0,
            FreeStorage: 50000,
          },
          usage: {
            bandwidthTotalUsage: 0,
            bandwidthDailyUsage: 0,
            dailyLimit: 100000,
          },
        };
        const newQuery = new Query(defaultQueryData);
        await newQuery.save();

        console.log(`Query created for user: ${data.userId}`);
      }
    } catch (error) {
      console.error("Error creating Query:", error);
      res.status(500).send("Error creating Query");
    }
  }
  if (type === "videosAdded") {
    try {
      const { userId, videosEv, gallery } = data;
      const query = await Query.findOne({ userId });
      if (query) {
        query.gallery.videos = gallery.videos;
        await query.save();
        console.log("Updated Query for videosAdded event:", userId);
      }
    } catch (error) {
      console.error("Error handling videosAdded event:", error.message);
    }
  }

  if (type === "videoRemoved") {
    try {
      const { userId, videoId, videoSize, gallery } = data;
      const query = await Query.findOne({ userId });
      if (query) {
        query.gallery.videos = gallery.videos;
        await query.save();
        console.log("Updated Query for videoRemoved event:", userId);
      }
    } catch (error) {
      console.error("Error handling videoRemoved event:", error.message);
    }
  }
  if (type === "StorageUpdated") {
    try {
      const { userId, storageDetails } = data;
      const query = await Query.findOne({ userId });
      if (query) {
        query.storage = {
          ...query.storage,
          ...storageDetails,
        };
        await query.save();
        console.log("Updated Query for StorageUpdated event:", userId);
      }
    } catch (error) {
      console.error("Error handling StorageUpdated event:", error.message);
    }
  }

  if (type === "UsageUpdated") {
    try {
      const { userId, usageDetails } = data;
      const query = await Query.findOne({ userId });
      if (query) {
        query.usage = {
          ...query.usage,
          ...usageDetails,
        };
        await query.save();
        console.log("Updated Query for UsageUpdated event:", userId);
      }
    } catch (error) {
      console.error("Error handling UsageUpdated event:", error.message);
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
      user.usage.bandwidthDailyUsage = 0;
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

const port = process.env.PORT || 4005;

app.listen(port, () =>
  console.log(`Query service Server up and running on port ${port}`)
);
