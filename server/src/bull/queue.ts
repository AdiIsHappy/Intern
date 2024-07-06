import Queue from "bull";
const config = require("../config.json");

const host = config.redis.host || "127.0.0.1";
const port = config.redis.port || 6379;

export const queue = new Queue("Queue", {
  redis: {
    host: host,
    port: port,
  },
});
