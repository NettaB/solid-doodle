const express = require("express");
const bodyParser = require("body-parser");

const LIKE_BASE = 10000;

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  next();
});

let fbLikes = LIKE_BASE;
let twLikes = LIKE_BASE;
let inLikes = LIKE_BASE;

const generateLikes = (currentLikes) => {
  const changeSize = Math.round(
    (Math.floor(Math.random() * 10) * currentLikes) / LIKE_BASE
  );
  const delta = Math.random() < 0.45 ? -changeSize : changeSize;
  const updatedLikes = currentLikes + delta;
  if (updatedLikes < 0) {
    updatedLikes = 0;
  }
  return { updatedLikes, delta };
};

app.get("/fb", (req, res) => {
  const { updatedLikes, delta, sentiment } = generateLikes(fbLikes);
  fbLikes = updatedLikes;
  console.log(`[Facebook] - ${updatedLikes} engagements`);
  res.set("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      currentLikes: updatedLikes,
      delta,
      sentiment: {
        positive: 76,
        negative: 20,
        neutral: 4,
      },
    })
  );
});

app.get("/tw", (req, res) => {
  const { updatedLikes, delta, sentiment } = generateLikes(twLikes);
  twLikes = updatedLikes;
  console.log(`[Twitter] - ${updatedLikes} engagements`);
  res.set("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      currentLikes: updatedLikes,
      delta,
      sentiment: {
        positive: 41,
        negative: 35,
        neutral: 24,
      },
    })
  );
});

app.get("/in", (req, res) => {
  const { updatedLikes, delta, sentiment } = generateLikes(inLikes);
  inLikes = updatedLikes;
  console.log(`[Instagram] - ${updatedLikes} engagements`);
  res.set("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      currentLikes: updatedLikes,
      delta,
      sentiment: {
        positive: 84,
        negative: 4,
        neutral: 12,
      },
    })
  );
});

app.listen(8081, function (err) {
  if (err) {
    throw err;
  }

  console.log("Server started on port 8081");
});
