const { createClient } = require("redis");
require("dotenv").config();

const redisClient = createClient({
  url: process.env.REDIS_URL, 
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 50, 500), 
  },
});

redisClient.on("error", (err) => console.error(" Redis Error:", err));

(async () => {
  await redisClient.connect();
  console.log(" Connected to Redis Cloud");
})();

module.exports = redisClient; 
