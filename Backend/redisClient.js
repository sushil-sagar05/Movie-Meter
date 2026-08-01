const { createClient } = require("redis");
require("dotenv").config();

const redisUrl = process.env.REDIS_URL;

const redisClient = {
  get: async () => null,
  setEx: async () => undefined,
  on: () => undefined,
  connect: async () => undefined,
};

if (!redisUrl) {
  console.warn("REDIS_URL is not configured; Redis caching is disabled.");
} else {
  const client = createClient({
    url: redisUrl,
    socket: {
      reconnectStrategy: false,
    },
  });

  client.on("error", (err) => {
    console.error(" Redis Error:", err);
  });

  (async () => {
    try {
      await client.connect();
      console.log(" Connected to Redis Cloud");
      redisClient.get = client.get.bind(client);
      redisClient.setEx = client.setEx.bind(client);
      redisClient.on = client.on.bind(client);
      redisClient.connect = client.connect.bind(client);
    } catch (error) {
      console.error(" Redis connection failed; cache disabled:", error);
    }
  })();
}

module.exports = redisClient;
