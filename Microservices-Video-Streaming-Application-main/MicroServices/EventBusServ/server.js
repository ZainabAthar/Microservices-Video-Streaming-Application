const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
require("dotenv").config();
app.use(bodyParser.json());
app.post("/events", (req, res) => {
  const event = req.body;
  console.log(event)
  try {
    axios.post(`${process.env.AUTH_SERV}/events`, event).catch((err) => {
      console.log(err.message);
    });
} catch (error) {
  console.log(error);
}
  try {
  axios.post(`${process.env.STORAGE_SERV}/events`, event).catch((err) => {
                            console.log(err.message);
});
} catch (error) {
  console.log(error);
}
  try {
  axios.post(`${process.env.GALLERY_SERV}/events`, event).catch((err) => {
                            console.log(err.message);
});
} catch (error) {
  console.log(error);
}
  try {
  axios.post(`${process.env.LOG_SERV}/events`, event).catch((err) => {
                        console.log(err.message);
});
} catch (error) {
  console.log(error);
}
  try {
  axios.post(`${process.env.USAGE_SERV}/events`, event).catch((err) => {
                          console.log(err.message);
});
} catch (error) {
  console.log(error);
}
  try {
  axios.post(`${process.env.QUERY_SERV}/events`, event).catch((err) => {
                          console.log(err.message);
});
} catch (error) {
  console.log(error);
}
  res.send({ status: "OK" });
});

app.listen(4010, () => {
  console.log("Event Bus Listening on 4010");
});