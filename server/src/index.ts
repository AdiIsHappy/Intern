import { configDotenv } from "dotenv";
import express from "express";
import { queue } from "./bull/queue";
import apiRouter from "./routes/app_routes";
const config = require("./config.json");
const cors = require("cors");

configDotenv();

const app = express();

queue
  .obliterate({ force: true })
  .then(() => console.log("emptied queue"))
  .catch(console.error);

const logQueueState = async () => {
  try {
    const jobCounts = await queue.getJobCounts();
    console.log("Queue State:", jobCounts);
  } catch (error) {
    console.error("Error getting queue state:", error);
  }
};

// Log the queue state every minute
setInterval(logQueueState, 3000);

// Setup middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", apiRouter);

app.get("/queue", async (req, res) => {
  res.json(await queue.getJobs(["failed", "completed", "active"]));
});

// // Start the server
const PORT = config.port || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
