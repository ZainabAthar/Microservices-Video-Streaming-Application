const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("./config/db");
const bodyParser = require("body-parser");
const { Gallery } = require("./models/GallerySchema");
const cron = require("node-cron");

require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());

const videos = require("./routes/videos");

app.use("/videos/", videos);
app.post("/events", async (req, res) => {
  console.log("Event Received:", req.body.type);
  const { type, data } = req.body;

  if (type === "UserCreated") {
    try {
      const { userId } = data;
      const existingGallery = await Gallery.findOne({ userId: userId });
      if (!existingGallery) {
        const newGallery = new Gallery({
          userId: userId,
          freeStorage: 50000,
          freeBandwidth: 100000,
          videos: [],
        });
        await newGallery.save();

        console.log(`Gallery created for user ${data.userId}`);
      } else {
        console.log(`Gallery already exists for user ${data.userId}`);
      }
    } catch (error) {
      console.error("Error creating gallery:", error);
      return res.status(500).send("Internal Server Error");
    }
  }
  if (type === "StorageUpdated") {
    try {
      const { userId, storageDetails } = data;
      const existingGallery = await Gallery.findOne({ userId });

      if (!existingGallery) {
        console.log(`Gallery not found for user ${userId}`);
        return res.status(404).send("Gallery not found");
      }

      existingGallery.freeStorage = storageDetails.FreeStorage;

      await existingGallery.save();
      console.log(`Free storage updated for user ${userId}`);
    } catch (error) {
      console.error("Error updating free storage:", error.message);
      return res.status(500).send("Internal Server Error");
    }
  }
  if (type === "UsageUpdated") {
    try {
      const { userId, usageDetails } = data;
      const existingGallery = await Gallery.findOne({ userId });

      if (!existingGallery) {
        console.log(`Gallery not found for user ${userId}`);
        return res.status(404).send("Gallery not found");
      }

      existingGallery.freeBandwidth = 100000 - usageDetails.bandwidthDailyUsage;

      await existingGallery.save();
      console.log(`Free bandwidth updated for user ${userId}`);
    } catch (error) {
      console.error(
        "Error updating free bandwidth based on usage:",
        error.message
      );
      return res.status(500).send("Internal Server Error");
    }
  }
  res.send({});
});

// Schedule a cron job to run every day at 12 AM and reset bandwidth
cron.schedule("0 0 * * *", async () => {
  try {
    // Reset bandwidth for all users to 25MB
    const users = await Gallery.find({});

    for (const user of users) {
      user.freeBandwidth = 100000;
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

const port = process.env.PORT || 4002;

app.listen(port, () =>
  console.log(`Gallery service Server up and running on port ${port}`)
);
port.timeout = 300000; // 300,000 ms = 5 minutes